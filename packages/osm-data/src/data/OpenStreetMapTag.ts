export type OpenStreetMapTagObject = { [k in OpenStreetMapTag]?: string };

/**
 * From: https://wiki.openstreetmap.org/wiki/Elements
 *
 * All types of data element (nodes, ways and relations), as well as changesets,
 * can have tags. Tags describe the meaning of the particular element to which
 * they are attached.
 *
 * A tag consists of two free format text fields; a 'key' and a 'value'. Each of
 * these are Unicode strings of up to 255 characters.
 * For example, highway=residential defines the way as a road whose main function
 * is to give access to people's homes. An element cannot have 2 tags with the
 * same 'key', the 'key's must be unique. For example, you cannot have an element
 * tagged both amenity=restaurant and amenity=bar.
 *
 * There is no fixed dictionary of tags, but there are many conventions documented
 * on this wiki (starting with the Map Features page).
 *
 *      https://wiki.openstreetmap.org/wiki/Map_Features
 *
 * Tag usage can be measured with the Taginfo application. If there is more than one
 * way to tag a given feature, it's probably best to use the most common approach.
 *
 * Not all elements have tags. Nodes are often untagged if they are part of ways.
 * Both ways and nodes may be untagged if they are members of a relation.
 *
 * More details: https://wiki.openstreetmap.org/wiki/Tags
 *
 * https://wiki.openstreetmap.org/wiki/Map_Features
 * https://wiki.openstreetmap.org/wiki/Category:Features
 * https://wiki.openstreetmap.org/wiki/Key:addr
 *  addr:housenumber=*
 *  addr:street=*
 *  addr:city=*
 *  addr:postcode=*
 *  addr:full=*
 *
 * https://github.com/christopherodier/OpenStreetMap-Collapsible-Tree-Visualisation/blob/master/openstreetmap-stack.json
 * https://github.com/h4ck3rm1k3/FOSM-Api/blob/8898194206574022b8616a378c1de6d607b72d98/OSM-API-Proxy/rdf/OSM_Open_Map_Features_Spreadsheet-Wiki%20OSM%20Features%20Chart-1.csv
 *
 */
export type OpenStreetMapTag =
    | 'access'
    | 'alt_name'
    | 'barrier'
    | 'bicycle'
    | 'bridge'
    | 'button_operated'
    | 'change:lanes:backward'
    | 'change:lanes:forward'
    | 'change:lanes'
    | 'colour'
    | 'created_by'
    | 'crossing'
    | 'cycleway:left'
    | 'cycleway:right'
    | 'cycleway'
    | 'destination:ref'
    | 'destination:street'
    | 'destination'
    | 'direction'
    | 'fixme'
    | 'foot'
    | 'footway'
    | 'guidepost'
    | 'hgv'
    | 'highway'
    | 'history'
    | 'horse'
    | 'hov:lanes'
    | 'hov:minimum'
    | 'hov'
    | 'incline'
    | 'lanes:backward'
    | 'lanes:both_ways'
    | 'lanes:forward'
    | 'lanes'
    | 'layer'
    | 'lcn'
    | 'lit'
    | 'location'
    | 'maxspeed:backward'
    | 'maxspeed:forward'
    | 'maxspeed:hgv'
    | 'maxspeed:trailer'
    | 'maxspeed'
    | 'motor_vehicle'
    | 'name_1'
    | 'name'
    | 'noref'
    | 'oneway'
    | 'parking:lane: left'
    | 'parking:lane:both'
    | 'parking:lane:right'
    | 'psv'
    | 'public_transport'
    | 'railway'
    | 'ref'
    | 'service'
    | 'sidewalk'
    | 'source:maxspeed'
    | 'source'
    | 'status'
    | 'stop'
    | 'surface'
    | 'tiger:cfcc'
    | 'tiger:county'
    | 'tiger:name_base_1'
    | 'tiger:name_base'
    | 'tiger:name_direction_prefix'
    | 'tiger:name_direction_suffix'
    | 'tiger:name_type_1'
    | 'tiger:name_type'
    | 'tiger:reviewed'
    | 'tiger:separated'
    | 'tiger:source'
    | 'tiger:tlid'
    | 'tiger:upload_uuid'
    | 'tiger:zip_right'
    | 'traffic_calming'
    | 'traffic_signals:direction'
    | 'traffic_signals'
    | 'turn:lanes:backward'
    | 'turn:lanes:forward'
    | 'turn:lanes';
