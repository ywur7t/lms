from flask import Flask

from .config import DevelopmentConfig
from .extensions import db

from .routes import title, building, aggregate, quiz
from flask_cors import CORS

def create_app():
    app = Flask(__name__)    
    
    app.json.ensure_ascii = False
    CORS(app)
    app.config.from_object(DevelopmentConfig)
    
    db.init_app(app)
    app.app_context().push()


    with app.app_context():
        db.create_all()

    app.register_blueprint(title.bp_title, url_prefix="/api/v1/title")
    app.register_blueprint(building.building_bp, url_prefix="/api/v1/buildings")
    app.register_blueprint(aggregate.aggregate_bp, url_prefix="/api/v1/aggregate")
    app.register_blueprint(quiz.quiz_bp, url_prefix="/api/v1/quizzes")
    return app