function calc_dist(lat_start, lng_start, lat_goal, lng_goal) {
    let geod = geodesic.Geodesic.WGS84, r;

    r = geod.Inverse(lat_start, lng_start, lat_goal, lng_goal);
    console.log("Distance is " + r.s12.toFixed(3) + "m.");

    return r.s12;
}