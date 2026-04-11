from marshmallow import fields
from ..extensions import ma


class AllBuildingsSchema(ma.Schema):
    id = fields.Int(required=True)
    title = fields.Str(required=True)
    type = fields.Str(required=True)
    country = fields.Str(required=True)
    city = fields.Str(required=True)
    year = fields.Int(required=True)
    height = fields.Float(required=True)


all_buildings_schema = AllBuildingsSchema(many=True)



class StatisticSchema(ma.Schema):
    id = fields.Int(required=False) 
    name = fields.Str(required=False) 
    year = fields.Int(required=False)
    avg_height = fields.Float(required=True)
    min_height = fields.Float(required=True)
    max_height = fields.Float(required=True)
    buildings_count = fields.Int(required=True)


all_stat_schema = StatisticSchema(many=True)
