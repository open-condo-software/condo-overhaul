const REFORMA_GKH_SETTINGS = {
    baseUrl: 'https://www.reformagkh.ru/opendata/export/',
    property: {
        links: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
        headers: ['id', 'region_id', 'area_id', 'city_id', 'street_id', 'shortname_region', 'formalname_region', 'shortname_area', 'formalname_area', 'shortname_city', 'formalname_city', 'shortname_street', 'formalname_street', 'house_number', 'building', 'block', 'letter', 'address', 'houseguid', 'management_organization_id', 'built_year', 'exploitation_start_year', 'project_type', 'house_type', 'is_alarm', 'method_of_forming_overhaul_fund', 'floor_count_max', 'floor_count_min', 'entrance_count', 'elevators_count', 'energy_efficiency', 'quarters_count', 'living_quarters_count', 'unliving_quarters_count', 'area_total', 'area_residential', 'area_non_residential', 'area_common_property', 'area_land', 'parking_square', 'playground', 'sportsground', 'other_beautification', 'foundation_type', 'floor_type', 'wall_material', 'basement_area', 'chute_type', 'chute_count', 'electrical_type', 'electrical_entries_count', 'heating_type', 'hot_water_type', 'cold_water_type', 'sewerage_type', 'sewerage_cesspools_volume', 'gas_type', 'ventilation_type', 'firefighting_type', 'drainage_typ'],
        indexes: ['management_organization_id', 'houseguid'],
    },
    organization: {
        links: [1],
        headers: ['id', 'subject_rf', 'name_full', 'name_short', 'name_employee', 'inn', 'orn', 'legal_address', 'actual_address', 'phone', 'email', 'site', 'count_mkd', 'area_total', 'w_summ'],
        indexes: ['inn'],
    },
}

module.exports = {
    REFORMA_GKH_SETTINGS,
}