from flask import Blueprint, render_template
from .models import TypeBuilding, City, Building, Country
from .extensions import db
from sqlalchemy import func

main = Blueprint('main', __name__)

@main.route('/')
def index():

    result_type_buildings = (
        db.session.query(
            TypeBuilding.id,
            TypeBuilding.type.label("Тип здания"),
            # Building.title.label("Здание")
        )
        .select_from(TypeBuilding)
        # .join(Building)
    )

    result_countries = (
        db.session.query(
            Country.id,
            Country.name.label("Страна"),
            # City.name.label("Город")        
        )
        .select_from(Country)
        # .join(City)
    )

    result_cities = (
        db.session.query(
            City.id,
            City.name.label("Город"),
            Country.name.label("Страна"),
            # Building.title.label("Здание")      
        )
        .select_from(City)
        .join(Country)
        # .join(Building)
    )

    result_buildings = (
        db.session.query(
            Building.id,
            Building.title.label("Здание"),
            TypeBuilding.type.label("Тип здания"),
            Building.year.label("Год"),
            Building.height.label("Высота"),
            City.name.label("Город"),    
        )
        .select_from(Building)
        .join(TypeBuilding)
        .join(City)
    )

    result_groups_type = (
        db.session.query(
            TypeBuilding.type.label("Тип здания"),
            func.max(Building.height).label("Макс.Высота"),
            func.min(Building.height).label("Мин.Высота"),
            func.round(func.avg(Building.height), 3).label("Средн.Высота")
        )
        .select_from(Building)
        .join(TypeBuilding)
        .group_by(TypeBuilding.type)
    )

    result_groups_country = result_groups_type
    result_groups_country = (
        db.session.query(
            Country.name.label("Страна"),
            func.max(Building.height).label("Макс.Высота"),
            func.min(Building.height).label("Мин.Высота"),
            func.round(func.avg(Building.height), 3).label("Средн.Высота")
        )
        .select_from(Building)
        .join(TypeBuilding)
        .join(City)
        .join(Country)
        .group_by(Country.name)
    )
    # max, min, avrg height 
    #   typeBuilding, coutry












    return render_template(
        'index.html',

        type_buildings_head=result_type_buildings.statement.columns.keys(),
        type_buildings_body=result_type_buildings.all(),

        result_countries_head = result_countries.statement.columns.keys(),
        result_countries_body = result_countries.all(),
        
        result_cities_head = result_cities.statement.columns.keys(),
        result_cities_body = result_cities.all(),
        
        result_buildings_head = result_buildings.statement.columns.keys(),
        result_buildings_body = result_buildings.all(),

        result_groups_type_head = result_groups_type.statement.columns.keys(),
        result_groups_type_body = result_groups_type.all(),        
        
        result_groups_country_head = result_groups_country.statement.columns.keys(),
        result_groups_country_body = result_groups_country.all(),        
    )