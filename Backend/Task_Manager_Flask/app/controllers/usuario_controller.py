from flask import Blueprint, jsonify, request
from app.models.usuario import Usuario
from app import db

usuario_bp = Blueprint('usuario', __name__, url_prefix="/api/usuarios")

@usuario_bp.route("/", methods=["GET"])
def get_all():
    try:
        usuarios = Usuario.query.all()
        usuarios_json = [usuario.to_dict() for usuario in usuarios]
        return jsonify(usuarios_json), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@usuario_bp.route("/crear", methods=["POST"])
def crear():
    nuevo = request.get_json()
    if nuevo:
        try:
            usuario = Usuario(**nuevo)
            db.session.add(usuario)
            db.session.commit()
            return {"mensaje": "Usuario creado exitosamente"}, 201
        except Exception as e:
            return {"error": str(e)}, 400
    return {"error": "Datos JSON inválidos"}, 400

@usuario_bp.route("/editar/<int:id>", methods=["PUT"])
def actualizar(id):
    usuario = Usuario.query.get(id)
    if not usuario:
        return {"error": "Usuario no encontrado"}, 404

    datos = request.get_json()
    if not datos:
        return {"error": "Datos JSON inválidos"}, 400

    usuario.nombre = datos.get("nombre", usuario.nombre)
    db.session.commit()
    return {"mensaje": "Usuario actualizado exitosamente"}, 200

@usuario_bp.route("/eliminar/<int:id>", methods=["DELETE"])
def eliminar(id):
    usuario = Usuario.query.get(id)
    if not usuario:
        return {"error": "Usuario no encontrado"}, 404

    db.session.delete(usuario)
    db.session.commit()
    return {"mensaje": "Usuario eliminado exitosamente"}, 200

@usuario_bp.route("/<int:id>", methods=["GET"])
def get(id):
    usuario = Usuario.query.get(id)
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify(usuario.to_dict()), 200
