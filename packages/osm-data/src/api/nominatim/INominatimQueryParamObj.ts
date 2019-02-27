
export type NominatimFormat = 'html' | 'json' | 'xml' | 'jsonv2';
export type ZeroOrOne = 0 | 1;

export interface INominatimQueryParamObj {


    /**
     * format=[html|xml|json|jsonv2]
     *
     * Output format
     * html is the default
     */
    format?: NominatimFormat;


    /**
     * json_callback=<string>
     *
     * Wrap json output in a callback function (JSONP) i.e. <string>(<json>)
     */
    json_callback?: string;


    /**
     * accept-language=<browser language string>
     *
     * Preferred language order for showing search results, overrides the value specified in the "Accept-Language" HTTP header.
     * Either uses standard rfc2616 accept-language string or a simple comma separated list of language codes.
     */
    'accept-language'?: string;


    /**
     * q=<query>
     *
     * Query string to search for. Alternatively can be entered as:
     */
    q?: string;
    // **** OR ****


    /**
     * street=<housenumber> <streetname>
     * city=<city>
     * county=<county>
     * state=<state>
     * country=<country>
     * postalcode=<postalcode>
     *
     * (experimental) Alternative query string format for structured requests.
     * Structured requests are faster and require fewer server resources.
     * For North American addresses, use the full name for state to improve the results.
     * DO NOT COMBINE WITH q=<query> PARAMETER.
     */
    street?: string;
    city?: string;
    county?: string;
    state?: string;
    country?: string;
    postalcode?: string;



    /**
     * countrycodes=<countrycode>[,<countrycode>][,<countrycode>]...
     *
     * Limit search results to a specific country (or a list of countries).
     * <countrycode> should be the ISO 3166-1alpha2 code, e.g. gb for the United Kingdom, de for Germany, etc.
     */
    countrycodes?: string;


    /**
     * viewbox=<x1>,<y1>,<x2>,<y2>
     *
     * The preferred area to find search results. Any two corner points of the box are accepted in any order as long as they span a real box.
     */
    viewbox?: string;



    /**
     * bounded=[0|1]
     *
     * Restrict the results to only items contained with the viewbox (see above).
     * Restricting the results to the bounding box also enables searching by amenity only.
     * For example a search query of just "[pub]" would normally be rejected but with bounded=1 will result in a list of items matching within the bounding box.
     */
    bounded?: ZeroOrOne;


    // /**
    //  * polygon=[0|1]
    //  * Output polygon outlines for items found
    //  * (deprecated, use one of the polygon_* parameters instead)
    //  *
    //  * NOTE: blocked from use now
    //  */
    // DEPRECATED_polygon?:ZeroOrOne;


    /**
     * addressdetails=[0|1]
     *
     * Include a breakdown of the address into elements
     */
    addressdetails?: ZeroOrOne;


    /**
     * email=<valid email address>
     *
     * If you are making large numbers of request please include a valid email address or alternatively include your email address as part of the User-Agent string.
     * This information will be kept confidential and only used to contact you in the event of a problem, see Usage Policy for more details.
     */
    email?: string;


    /**
     * exclude_place_ids=<place_id,[place_id],[place_id]>
     *
     * If you do not want certain openstreetmap objects to appear in the search result, give a comma separated list of the place_id's you want to skip. This can be used to broaden search results. For example, if a previous query only returned a few results, then including those here would cause the search to return other, less accurate, matches (if possible)
     */
    exclude_place_ids?: string;


    /**
     * limit=<integer>
     *
     * Limit the number of returned results. Default is 10.
     */
    limit?: number;


    /**
     * dedupe=[0|1]
     *
     * Sometimes you have several objects in OSM identifying the same place or object in reality. The simplest case is a street being split in many different OSM ways due to different characteristics.
     * Nominatim will attempt to detect such duplicates and only return one match; this is controlled by the dedupe parameter which defaults to 1. Since the limit is, for reasons of efficiency, enforced before and not after de-duplicating, it is possible that de-duplicating leaves you with less results than requested.
     */
    dedupe?: ZeroOrOne;


    /**
     * debug=[0|1]
     *
     * Output assorted developer debug information. Data on internals of nominatim "Search Loop"
     * logic, and SQL queries. The output is (rough) HTML format. This overrides the specified
     * machine readable format.
     */
    debug?: ZeroOrOne;


    /**
     * polygon_geojson=1
     *
     * Output geometry of results in geojson format.
     */
    polygon_geojson?: ZeroOrOne;


    /**
     * polygon_kml=1
     *
     * Output geometry of results in kml format.
     */
    polygon_kml?: ZeroOrOne;


    /**
     * polygon_svg=1
     *
     * Output geometry of results in svg format.
     */
    polygon_svg?: ZeroOrOne;


    /**
     * polygon_text=1
     *
     * Output geometry of results as a WKT.
     */
    polygon_text?: ZeroOrOne;


    /**
     * extratags=1
     *
     * Include additional information in the result if available, e.g. wikipedia link, opening hours.
     */
    extratags?: ZeroOrOne;


    /**
     * namedetails=1
     *
     * Include a list of alternative names in the results.
     * These may include language variants, references, operator and brand.
     */
    namedetails?: ZeroOrOne;
}