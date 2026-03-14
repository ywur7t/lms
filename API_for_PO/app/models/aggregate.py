from sqlalchemy import func, desc
from app.extensions import db

from app.models.athlete_participations import Athlete_Participations
from app.models.games import Games
from app.models.athletes import Athletes
from app.models.medals import Medals
from app.models.coaches import Coaches

def get_all_athlete_participations():
    query = (
        db.session.query(
            Athlete_Participations.id,
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
            Athlete_Participations.result_value,
            Athlete_Participations.result_unit,
            Athlete_Participations.is_record_holder,
            Athlete_Participations.notes
        )
        .select_from(Athlete_Participations)
        .join(Athletes, Athletes.id == Athlete_Participations.athlete_id) 
        .join(Games, Games.id == Athlete_Participations.games_id)         
        .join(Coaches, Coaches.id == Athlete_Participations.coach_id)     
        .join(Medals, Medals.id == Athlete_Participations.medal_id)
    )

    results = query.all()
    keys = query.statement.columns.keys()
    formatted_results = [
        {field_name: value for field_name, value in zip(keys, result)}
        for result in results
    ]
    return formatted_results

def get_one_athlete_participations():
    query = (
        db.session.query(

        )
    )