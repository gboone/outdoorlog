require 'JSON'

wilderness_json = JSON.load(File.read(File.join('_api','wilderness.json')))
geo_template = {  "type": "FeatureCollection","crs": {"type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" }  },  "features": []}
features = wilderness_json['features']
puts "This will create #{features.size} new files."
for feature in wilderness_json['features']
  park = geo_template
  name = feature['properties']['WILDERNE_1'].downcase.gsub(/[\/. ]/,'-')
  new_file = File.join('_api','parks','usfs-wilderness-areas',"#{name}.json")
  park[:features][0] = feature
  File.open(new_file, mode="w+") { |f|
    f.write(park.to_json)
  }
end
