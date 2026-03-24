from schemas.athletes import AthleteSchema
from schemas.games import GamesSchema
from schemas.medals import MedalsSchema
from schemas.events import EventsSchema
from extensions import ma, db
from models.athlete_participations import AthleteParticipations

class AthleteParticipationsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = AthleteParticipations
        load_instance = True
        sqla_session = db.session
        include_fk = True

    # games_id = ma.auto_field()
    # event_id = ma.auto_field()
    # coach_id = ma.auto_field()
    # medal_id = ma.auto_field()
    
    athlete = ma.Nested(AthleteSchema())
    games = ma.Nested(GamesSchema())
    medal = ma.Nested(MedalsSchema())
    event = ma.Nested(EventsSchema())






participation_cschema = AthleteParticipationsSchema()
participations_cschema = AthleteParticipationsSchema(many=True)
