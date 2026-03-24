from flask import Flask
from .config import DevelopmentConfig
from .extensions import db
from .routes import participations 
import models


def create_app():
    app = Flask(__name__)    
    app.json.ensure_ascii = False
    app.config.from_object(DevelopmentConfig)
    
    db.init_app(app)
    app.app_context().push()


    with app.app_context():
        db.create_all()

    
   
    return app