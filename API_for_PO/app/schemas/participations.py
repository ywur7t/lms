from app.schemas.athletes import AthleteSchema
from app.schemas.games import GamesSchema
from app.schemas.medals import MedalsSchema
from app.extensions import ma, db
from app.models.athlete_participations import Athlete_Participations

class AthleteParticipationsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Athlete_Participations
        load_instance = True
        sqla_session = db.session
    
    athlete = ma.Nested(AthleteSchema)
    games = ma.Nested(GamesSchema)
    medal = ma.Nested(MedalsSchema)


participation_cschema = AthleteParticipationsSchema()
participations_cschema = AthleteParticipationsSchema(many=True)
