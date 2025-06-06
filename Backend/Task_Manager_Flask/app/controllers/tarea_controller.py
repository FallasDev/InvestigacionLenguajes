from flask import Blueprint, jsonify, request
from app.models.tarea import Tarea
from app import db

tarea_bp = Blueprint('tarea', __name__, url_prefix="/api/tareas")

@tarea_bp.route("/", methods=["GET"])
def get_all():
    tareas = Tarea.query.all()
    return jsonify([t.to_dict() for t in tareas]), 200

@tarea_bp.route("/", methods=["POST"])
def crear():
    data = request.get_json()
    if not data:
        return {"error": "Datos JSON inválidos"}, 400
    tarea = Tarea(**data)
    db.session.add(tarea)
    db.session.commit()
    return {"mensaje": "Tarea creada exitosamente"}, 201

@tarea_bp.route("/<int:id>", methods=["GET"])
def obtener(id):
    tarea = Tarea.query.get(id)
    if not tarea:
        return {"error": "Tarea no encontrada"}, 404
    return jsonify(tarea.to_dict()), 200

@tarea_bp.route("/<int:id>", methods=["PUT"])
def actualizar(id):
    tarea = Tarea.query.get(id)
    if not tarea:
        return {"error": "Tarea no encontrada"}, 404
    data = request.get_json()
    for key, value in data.items():
        setattr(tarea, key, value)
    db.session.commit()
    return {"mensaje": "Tarea actualizada exitosamente"}, 200

@tarea_bp.route("/<int:id>", methods=["DELETE"])
def eliminar(id):
    tarea = Tarea.query.get(id)
    if not tarea:
        return {"error": "Tarea no encontrada"}, 404
    db.session.delete(tarea)
    db.session.commit()
    return {"mensaje": "Tarea eliminada exitosamente"}, 200
