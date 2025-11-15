#!/usr/bin/env node
import args from "@rcompat/args";
import assert from "@rcompat/assert";
import json from "@rcompat/fs/project/package";

const pkg_json = await json();

if (args[0] === "bump") {
  const type = args[1];
  assert(["major", "minor", "patch"].includes(type),
    "can only bump major, minor or patch")
  const package_json = await pkg_json.json<{ version: string }>();
  const { version } = package_json;

  const match = version.match(/^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)$/);
  if (match?.groups) {
    let major: number = Number(match.groups.major);
    let minor: number = Number(match.groups.minor);
    let patch: number = Number(match.groups.patch);

    if (type === "major") {
      major++;
      minor = 0;
      patch = 0;
    }
    if (type === "minor") {
      minor++;
      patch = 0;
    }
    if (type === "patch") {
      patch++;
    }
    package_json.version = `${major}.${minor}.${patch}`;
    await pkg_json.writeJSON(package_json);
    console.log(`bumped ${version} -> ${package_json.version}`);
  } else {
    console.error(`couldn't match package.json's version`);
  }
}
