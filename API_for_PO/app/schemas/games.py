from app.extensions import ma, db
from app.models.games import Games

class GamesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Games
        load_instance = True
        sqla_session = db.session

game_cschema = GamesSchema()
games_cschema = GamesSchema(many=True)
