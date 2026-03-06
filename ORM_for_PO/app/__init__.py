from flask import Flask

from .config import DevelopmentConfig
from app.views import main

from .upload_db import *
from .crud import *
from .models import db


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    db.init_app(app)
    app.app_context().push()
    with app.app_context():
        db.create_all()

    app.register_blueprint(main)

    # upload_sports()
    # upload_medals()
    # upload_games()
    # upload_countries()
    # upload_coaches()
    # upload_events()
    # upload_athletes()
    # upload_athlete_participation()
    # upload_events_sports()

    # read_all(Sports)
    # read_all(Medals)
    # read_all(Games)
    # read_all(Countries)
    # read_all(Coaches)
    # read_all(Events)
    # read_all(Athletes)
    # read_all(Athlete_Participations)
    # read_all(EventsSports)

    # delete_all(Sports)
    # delete_all(Medals)
    # delete_all(Games)
    # delete_all(Countries)
    # delete_all(Coaches)
    # delete_all(Events)
    # delete_all(Athletes)
    # delete_all(Athlete_Participations)
    # delete_all(EventsSports)

    return app