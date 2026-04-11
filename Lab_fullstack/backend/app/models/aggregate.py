from ..models.country import Country
from ..models.city import City
from ..models.type_building import TypeBuilding
from ..models.buildings import Building
from sqlalchemy import func, desc
from ..extensions import db


def get_all_buildings():
    query = (
        db.session.query(
            Building.id,
            Building.title,
            TypeBuilding.type.label("type"),
            Country.name.label("country"),
            City.name.label("city"),
            Building.year,
            Building.height,
        )
        .select_from(Building)
        .join(TypeBuilding)
        .join(City)
        .join(Country)
    )
    results = query.all()
    keys = query.statement.columns.keys()
    formatted_results = [
        {field_name: value for field_name, value in zip(keys, result)}
        for result in results
    ]
    return formatted_results


def get_stat_by_country():
    query = (
        db.session.query(
            Country.id,
            Country.name,
            func.avg(Building.height).label('avg_height'), 
            func.min(Building.height).label('min_height'),
            func.max(Building.height).label('max_height'),
            func.count(Building.id).label('buildings_count')
        )
        .select_from(Country)
        .join(City)
        .join(Building)
        .group_by(Country.id, Country.name)
    )
    results = query.all()
    keys = query.statement.columns.keys()
    formatted_results = [
        {field_name: value for field_name, value in zip(keys, result)}
        for result in results
    ]
    return formatted_results

def get_stat_by_type():
    query = (
        db.session.query(
            TypeBuilding.id,
            TypeBuilding.type,            
            func.avg(Building.height).label('avg_height'), 
            func.min(Building.height).label('min_height'),
            func.max(Building.height).label('max_height'),
            func.count(Building.id).label('buildings_count')
        )
        .select_from(TypeBuilding)
        .join(Building)
        .group_by(TypeBuilding.id, TypeBuilding.type)
    )
    results = query.all()
    keys = query.statement.columns.keys()
    formatted_results = [
        {field_name: value for field_name, value in zip(keys, result)}
        for result in results
    ]
    return formatted_results

def get_stat_by_year():
    query = (
        db.session.query(
            Building.year.label('year'),
            func.avg(Building.height).label('avg_height'),
            func.min(Building.height).label('min_height'),
            func.max(Building.height).label('max_height'),
            func.count(Building.id).label('buildings_count')
        )
        .select_from(Building)
        .group_by(Building.year)
    )
    results = query.all()
    keys = query.statement.columns.keys()

    formated_results = [
        {field_name: value for field_name, value in zip(keys, result)}
        for result in results
    ]
    return formated_results