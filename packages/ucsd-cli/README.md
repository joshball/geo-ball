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
$ npm install -g ucsd-cli
$ ucsd-cli COMMAND
running command...
$ ucsd-cli (-v|--version|version)
ucsd-cli/1.0.0 win32-x64 node-v11.5.0
$ ucsd-cli --help [COMMAND]
USAGE
  $ ucsd-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ucsd-cli OsmToRoadSeg OSMDATAFILE [ROADSEGEMENTSFILE]`](#ucsd-cli-osm-to-road-seg-osmdatafile-roadsegementsfile)
* [`ucsd-cli commands`](#ucsd-cli-commands)
* [`ucsd-cli help [COMMAND]`](#ucsd-cli-help-command)
* [`ucsd-cli stats`](#ucsd-cli-stats)
* [`ucsd-cli which COMMAND`](#ucsd-cli-which-command)

## `ucsd-cli OsmToRoadSeg OSMDATAFILE [ROADSEGEMENTSFILE]`

Converts OSM files to Road Segment Files

```
USAGE
  $ ucsd-cli OsmToRoadSeg OSMDATAFILE [ROADSEGEMENTSFILE]

ARGUMENTS
  OSMDATAFILE        OSM Data file
  ROADSEGEMENTSFILE  Road Segments file for UCSD Graph

OPTIONS
  -f, --format=json|text|both  [default: json] Output format (json,text,both)
  -h, --help                   show CLI help
  -o, --overwrite

EXAMPLES
  $ cli convert osmDataFile
  $ cli convert osmDataFile roadSegmentFile
```

_See code: [build\commands\OsmToRoadSeg.ts](https://github.com/joshball/ball-maps/blob/v1.0.0/build\commands\OsmToRoadSeg.ts)_

## `ucsd-cli commands`

list all the commands

```
USAGE
  $ ucsd-cli commands

OPTIONS
  -h, --help  show CLI help
  -j, --json  output in json format
  --hidden    also show hidden commands
```

_See code: [@oclif/plugin-commands](https://github.com/oclif/plugin-commands/blob/v1.2.2/src\commands\commands.ts)_

## `ucsd-cli help [COMMAND]`

display help for ucsd-cli

```
USAGE
  $ ucsd-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src\commands\help.ts)_

## `ucsd-cli stats`

Get stats for a data file

```
USAGE
  $ ucsd-cli stats

OPTIONS
  -h, --help                     show CLI help
  -o, --osmDataFile=osmDataFile  OSM Data JSON file

EXAMPLE
  $ cli stats
```

_See code: [build\commands\stats.ts](https://github.com/joshball/ball-maps/blob/v1.0.0/build\commands\stats.ts)_

## `ucsd-cli which COMMAND`

show which plugin a command is in

```
USAGE
  $ ucsd-cli which COMMAND
```

_See code: [@oclif/plugin-which](https://github.com/oclif/plugin-which/blob/v1.0.3/src\commands\which.ts)_
<!-- commandsstop -->
