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
$ npm install -g @ball-maps/ucsd-cli
$ ucsd-cli COMMAND
running command...
$ ucsd-cli (-v|--version|version)
@ball-maps/ucsd-cli/1.0.0 win32-x64 node-v11.5.0
$ ucsd-cli --help [COMMAND]
USAGE
  $ ucsd-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ucsd-cli generate:int [ROADSEGEMENTSFILE]`](#ucsd-cli-generateint-roadsegementsfile)
* [`ucsd-cli generate:osm [OSMQUERYFILE]`](#ucsd-cli-generateosm-osmqueryfile)
* [`ucsd-cli generate:rsd [OSMDATAFILE]`](#ucsd-cli-generatersd-osmdatafile)
* [`ucsd-cli help [COMMAND]`](#ucsd-cli-help-command)
* [`ucsd-cli stats`](#ucsd-cli-stats)

## `ucsd-cli generate:int [ROADSEGEMENTSFILE]`

Generates INT (intersections) files from RSD (Road Segment Data) Files

```
USAGE
  $ ucsd-cli generate:int [ROADSEGEMENTSFILE]

ARGUMENTS
  ROADSEGEMENTSFILE  Road Segments file for UCSD Graph

OPTIONS
  -d, --dataDir=dataDir  Map Data Directory
  -h, --help             show CLI help
  -o, --out=out          Alternative path to int file to generate
  -o, --overwrite

EXAMPLES
  $ ucsd-cli generate:int --all
  $ ucsd-cli generate:int roadSegmentsFile
  $ ucsd-cli generate:int roadSegmentsFile --out alternative-int-file-path
```

_See code: [build\commands\generate\int.ts](https://github.com/joshball/ball-maps/blob/v1.0.0/build\commands\generate\int.ts)_

## `ucsd-cli generate:osm [OSMQUERYFILE]`

Generates an OSM (OpenStreetMap) data files by sending an OSM query to an OSM server

```
USAGE
  $ ucsd-cli generate:osm [OSMQUERYFILE]

ARGUMENTS
  OSMQUERYFILE  OSM Query file

OPTIONS
  -d, --dataDir=dataDir        Data Directory
  -f, --format=json|text|both  [default: json] Output format (json,text,both)
  -h, --help                   show CLI help
  -o, --overwrite

EXAMPLES
  $ ucsd-cli generate:osm --all
  $ ucsd-cli generate:osm osmQueryFile
  $ ucsd-cli generate:osm osmQueryFile --out alternative-osm-data-path
```

_See code: [build\commands\generate\osm.ts](https://github.com/joshball/ball-maps/blob/v1.0.0/build\commands\generate\osm.ts)_

## `ucsd-cli generate:rsd [OSMDATAFILE]`

Generates RSD (Road Segment Data) Files from OSM (OpenStreetMap) data files

```
USAGE
  $ ucsd-cli generate:rsd [OSMDATAFILE]

ARGUMENTS
  OSMDATAFILE  OSM Data file

OPTIONS
  -d, --dataDir=dataDir        Data Directory
  -f, --format=json|text|both  [default: json] Output format (json,text,both)
  -h, --help                   show CLI help
  -o, --overwrite

EXAMPLES
  $ ucsd-cli generate:rsd --all
  $ ucsd-cli generate:rsd osmDataFile
  $ ucsd-cli generate:rsd osmDataFile --out alternative-rsd-path
```

_See code: [build\commands\generate\rsd.ts](https://github.com/joshball/ball-maps/blob/v1.0.0/build\commands\generate\rsd.ts)_

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
<!-- commandsstop -->
