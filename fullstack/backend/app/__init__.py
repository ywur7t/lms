from flask import Flask
from backend.app.config import DevelopmentConfig
from backend.app.extensions import db
from flask_cors import CORS

from backend.app.routes import participations 



def create_app():
    app = Flask(__name__)    
    app.json.ensure_ascii = False
    CORS(app)
    app.config.from_object(DevelopmentConfig)
    
    db.init_app(app)
    with app.app_context():
        db.create_all()


    app.register_blueprint(participations.participations_bp, url_prefix="/api/v1/participations")
   
    return app