from flask import Blueprint, render_template
from .models import athlete_participations
from .extensions import db
from sqlalchemy import func

main = Blueprint('main', __name__)

@main.route('/')
def index():

    return render_template(
        'index.html',
)