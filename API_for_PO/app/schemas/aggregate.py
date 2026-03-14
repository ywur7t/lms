from marshmallow import fields
from app.extensions import ma

class AllPatricipationsSchema(ma.Schema):
    id = fields.Int(required=True)
    year = fields.Int(required=True)
    games_id =  fields.Str(required=True)
    host_city = fields.Str(required=True)
    athlete_name = fields.Str(required=True)
    gender = fields.Str(required=True)
    birth_date = fields.DateTime(required=True)
    height = fields.Int(required=True)
    weight = fields.Int(required=True)
    medal = fields.Str(required=True)
    coach_name = fields.Str(required=True)
    result_value = fields.Float(required=True)
    result_unit = fields.Str(required=True)
    is_record_holder = fields.Str(required=True)
    notes = fields.Str(required=True)


all_patricipations_schema = AllPatricipationsSchema(many=True)