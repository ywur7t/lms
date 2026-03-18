from app.models.athletes import Athletes
from app.models.athlete_participations import AthleteParticipations
from app.models.games import Games
from app.models.coaches import Coaches
from app.models.medals import Medals
from app.models.events import Events
from app.models.countries import Countries
from app.models.sports import Sports
from app.models.eventssports import EventsSports

from sqlalchemy import func, desc
from app.extensions import db


def get_all_participations():
    query = (
        db.session.query(
            AthleteParticipations.id,
            Games.year,
            Games.games_type, 
            Games.host_city,
            Athletes.name.label('athlete_name'),
            Athletes.gender,
            Athletes.birth_date,
            Athletes.height,
            Athletes.weight,
            Coaches.name.label('coach_name'), 
            Medals.medal,
            AthleteParticipations.result_value,
            AthleteParticipations.result_unit,
            AthleteParticipations.is_record_holder,
            AthleteParticipations.notes
        )
        .select_from(AthleteParticipations)
        .join(Athletes, Athletes.id == AthleteParticipations.athlete_id) 
        .join(Games, Games.id == AthleteParticipations.games_id)         
        .join(Coaches, Coaches.id == AthleteParticipations.coach_id)     
        .join(Medals, Medals.id == AthleteParticipations.medal_id)
    )

    results = query.all()
    keys = query.statement.columns.keys()
    formatted_results = [
        {field_name: value for field_name, value in zip(keys, result)}
        for result in results
    ]
    return formatted_results


def stats_by_games():
    query = (
        db.session.query(
            Games.year,
            Games.games_type,
            func.min(AthleteParticipations.result_value).label("min_result"),
            func.max(AthleteParticipations.result_value).label("max_result"),
            func.avg(AthleteParticipations.result_value).label("avg_result"),
        )
        .join(AthleteParticipations, AthleteParticipations.games_id == Games.id)
        .group_by(Games.year, Games.games_type)
    )

    return query.all()

def stats_by_athletes():
    query = (
        db.session.query(
            Athletes.name,
            func.min(AthleteParticipations.result_value).label("min_result"),
            func.max(AthleteParticipations.result_value).label("max_result"),
            func.avg(AthleteParticipations.result_value).label("avg_result"),
        )
        .join(AthleteParticipations, AthleteParticipations.athlete_id == Athletes.id)
        .group_by(Athletes.name)
    )

    return query.all()

def stats_by_medals():
    query = (
        db.session.query(
            Medals.medal,
            func.min(AthleteParticipations.result_value).label("min_result"),
            func.max(AthleteParticipations.result_value).label("max_result"),
            func.avg(AthleteParticipations.result_value).label("avg_result"),
        )
        .join(AthleteParticipations, AthleteParticipations.medal_id == Medals.id)
        .group_by(Medals.medal)
    )

    return query.all()