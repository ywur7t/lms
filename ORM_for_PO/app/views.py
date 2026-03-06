from flask import Blueprint, render_template
from .models import *
from sqlalchemy import func

main = Blueprint('main', __name__)

@main.route('/')
def index():

    result_countries = (
        db.session.query(
            Countries.id,
            Countries.code,
            Countries.country,
            Countries.first_participation_year,
            Countries.best_rank,
        )
        .select_from(Countries)
    )

    result_games = (
        db.session.query(
            Games.id,
            Games.year,
            Games.games_type,
            Games.host_city,
        )
        .select_from(Games)
    )

    result_coaches = (
        db.session.query(
            Coaches.id,
            Coaches.name,
        )
        .select_from(Coaches)
    )
    
    result_medals = (
        db.session.query(
            Medals.id,
            Medals.medal,
        )
        .select_from(Medals)
    )
    
    result_sports = (
        db.session.query(
            Sports.id,
            Sports.sport,
        )
        .select_from(Sports)
    )
    result_events = (
        db.session.query(
            Events.id,
            Events.event,
        )
        .select_from(Events)
    )
    
    # result_EventsSports = (
    #     db.session.query(
    #         EventsSports.sport_id,
    #         EventsSports.event_id,
    #     )
    #     .select_from(EventsSports)
    #     .join(Sports)
    #     .join(Events)

    # )

    result_Athletes = (
        db.session.query(
            Athletes.id,
            Athletes.name,
            Athletes.gender,
            Athletes.birth_date,
            Athletes.height,
            Athletes.weight,
            Countries.country,
        )
        .select_from(Athletes)
        .join(Countries)
    )
    result_Athlete_Participations = (
        db.session.query(
            Athlete_Participations.id,
            Athletes.name,
            Games.games_type,
            Games.year,
            Games.host_city,
            Events.event,
            Events.team_or_individual,
            Coaches.name.label('coach'),
            Medals.medal,
            Athlete_Participations.result_value,
            Athlete_Participations.result_unit,
            Athlete_Participations.is_record_holder,
            Athlete_Participations.notes,
        )
        .select_from(Athlete_Participations)
        .join(Athletes)
        .join(Games)
        .join(Events)
        .join(Coaches)
        .join(Medals)
    )

    result_filter_countries_under_1924 = (
        db.session.query(
            Countries.id,
            Countries.code,
            Countries.country,
            Countries.first_participation_year,
            Countries.best_rank
        )
        .select_from(Countries)
        .where(Countries.first_participation_year < 1924)
    )



    result_query1 = (
        db.session.query(
            Athletes.name,
            Athletes.gender,
            Athletes.height,
            Countries.country
        )
        .join(Countries)
        .filter(Athletes.gender == "Female")
        .order_by(Athletes.height.desc())
    )
    result_query2  = (
        db.session.query(
            Athletes.name,
            func.count(Medals.id).label("medals")
        )
        .select_from(Athletes)
        .join(Athlete_Participations)
        .join(Medals)
        .filter(Medals.medal != "No Medal")
        .group_by(Athletes.name)
        .order_by(func.count(Medals.id).desc())
        .limit(10)
    )
    result_query3 = (
    db.session.query(
        Athletes.name,
        Athletes.height,
        Athletes.weight,
        (Athletes.weight / func.pow(Athletes.height / 100, 2)).label("BMI")
    )
)
    result_query4 = (
        db.session.query(
            Countries.country,
            func.count(Athletes.id).label("athletes_count")
        )
        .join(Athletes)
        .group_by(Countries.country)
        .having(func.count(Athletes.id) > 200)
    )
    result_query5 = (
        db.session.query(
            Athletes.name,
            Athletes.height
        )
        .filter(
            Athletes.height > (
                db.session
                .query(
                    func
                    .avg(Athletes.height)
                )
                .scalar_subquery()))
    )





    




    return render_template(
        'index.html',    
        result_countries_head= result_countries.statement.columns.keys(),
        result_countries_body=result_countries.all(),
        
        result_games_head= result_games.statement.columns.keys(),
        result_games_body=result_games.all(),
        
        result_coaches_head= result_coaches.statement.columns.keys(),
        result_coaches_body=result_coaches.all(),
        
        result_medals_head= result_medals.statement.columns.keys(),
        result_medals_body=result_medals.all(),
        
        result_sports_head= result_sports.statement.columns.keys(),
        result_sports_body=result_sports.all(),
        
        result_events_head= result_events.statement.columns.keys(),
        result_events_body=result_events.all(),
        
        # result_EventsSports_head=result_EventsSports.statement.columns.keys(),
        # result_EventsSports_body=result_EventsSports.all(),
        
        result_Athletes_head= result_Athletes.statement.columns.keys(),
        result_Athletes_body=result_Athletes.all(),
        
        result_Athlete_Participations_head=  result_Athlete_Participations.statement.columns.keys(),
        result_Athlete_Participations_body=result_Athlete_Participations.all(),

        result_query1_head = result_query1.statement.columns.keys(),
        result_query1_body = result_query1.all(),
        
        result_query2_head = result_query2.statement.columns.keys(),
        result_query2_body = result_query2.all(),

        result_query3_head = result_query3.statement.columns.keys(),
        result_query3_body = result_query3.all(),

        result_query4_head = result_query4.statement.columns.keys(),
        result_query4_body = result_query4.all(),

        result_query5_head = result_query5.statement.columns.keys(),
        result_query5_body = result_query5.all(),
    )