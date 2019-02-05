osm-cli
=======

OpenStreetMaps CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/osm-cli.svg)](https://npmjs.org/package/osm-cli)
[![CircleCI](https://circleci.com/gh/joshball/ball-maps/tree/master.svg?style=shield)](https://circleci.com/gh/joshball/ball-maps/tree/master)
[![Codecov](https://codecov.io/gh/joshball/ball-maps/branch/master/graph/badge.svg)](https://codecov.io/gh/joshball/ball-maps)
[![Downloads/week](https://img.shields.io/npm/dw/osm-cli.svg)](https://npmjs.org/package/osm-cli)
[![License](https://img.shields.io/npm/l/osm-cli.svg)](https://github.com/joshball/ball-maps/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @ball-maps/osm-cli
$ osm-cli COMMAND
running command...
$ osm-cli (-v|--version|version)
@ball-maps/osm-cli/1.0.0 win32-x64 node-v11.5.0
$ osm-cli --help [COMMAND]
USAGE
  $ osm-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`osm-cli commands`](#osm-cli-commands)
* [`osm-cli download QUERYFILE`](#osm-cli-download-queryfile)
* [`osm-cli help [COMMAND]`](#osm-cli-help-command)
* [`osm-cli stats`](#osm-cli-stats)
* [`osm-cli which COMMAND`](#osm-cli-which-command)

## `osm-cli commands`

list all the commands

```
USAGE
  $ osm-cli commands

OPTIONS
  -h, --help  show CLI help
  -j, --json  output in json format
  --hidden    also show hidden commands
```

_See code: [@oclif/plugin-commands](https://github.com/oclif/plugin-commands/blob/v1.2.2/src\commands\commands.ts)_

## `osm-cli download QUERYFILE`

download data files

```
USAGE
  $ osm-cli download QUERYFILE

ARGUMENTS
  QUERYFILE  Query file used for OSM query

OPTIONS
  -h, --help  show CLI help

EXAMPLES
  $ cli download queryFile
  $ cli download --bounds 40.690856387926516,-111.86356544494627,40.72683597647796,-111.78271293640137
```

_See code: [build\commands\download.ts](https://github.com/joshball/ball-maps/blob/v1.0.0/build\commands\download.ts)_

## `osm-cli help [COMMAND]`

display help for osm-cli

```
USAGE
  $ osm-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src\commands\help.ts)_

## `osm-cli stats`

Get stats for a data file

```
USAGE
  $ osm-cli stats

OPTIONS
  -h, --help                     show CLI help
  -o, --osmDataFile=osmDataFile  OSM Data JSON file

EXAMPLE
  $ cli stats
```

_See code: [build\commands\stats.ts](https://github.com/joshball/ball-maps/blob/v1.0.0/build\commands\stats.ts)_

## `osm-cli which COMMAND`

show which plugin a command is in

```
USAGE
  $ osm-cli which COMMAND
```

_See code: [@oclif/plugin-which](https://github.com/oclif/plugin-which/blob/v1.0.3/src\commands\which.ts)_
<!-- commandsstop -->
