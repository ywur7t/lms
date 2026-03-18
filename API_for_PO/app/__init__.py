from flask import Flask
from .config import DevelopmentConfig
from .extensions import db

from .routes import participations 

from app import models


# from app.models.athletes import Athletes
# from app.models.athlete_participations import AthleteParticipations
# from app.models.games import Games
# from app.models.coaches import Coaches
# from app.models.medals import Medals
# from app.models.events import Events
# from app.models.countries import Countries
# from app.models.sports import Sports
# from app.models.eventssports import EventsSports


def create_app():
    app = Flask(__name__)    
    app.json.ensure_ascii = False
    app.config.from_object(DevelopmentConfig)
    
    db.init_app(app)
    # from . import models
    app.app_context().push()


    with app.app_context():
        db.create_all()

    app.register_blueprint(participations.participations_bp, url_prefix="/api/v1/participations")
   
    return app