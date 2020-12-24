from flask import Flask, request, redirect, url_for
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
api = Api(app)

students = [{'id' : 0, 'name' : 'Dmitry', 'age' : 18, 'group' : 'group-1'}]

parser = reqparse.RequestParser()
parser.add_argument('name', type=str)
parser.add_argument('age', type=int)
parser.add_argument('group', type=str)

class MyAppStudents(Resource):
    def get(self):
        return students
    def post(self):
        args = parser.parse_args()
        s = {}
        s['id'] = len(students)
        s['name'] = args['name']
        s['age'] = args['age']
        s['group'] = args['group']
        students.append(s)
        return s;

class MyAppStudent(Resource):
    def get(self, id):
        return students[id]
    def put(self, id):
        args = parser.parse_args()
        s = {}
        s['id'] = id
        s['name'] = args['name']
        s['age'] = args['age']
        s['group'] = args['group']
        students[id] = s
        return s
    def delete(self, id):
        s = students[id]
        del students[id]
        return s
        
@app.route('/')
def root():
    return redirect(url_for('static', filename='sample9.html'))

api.add_resource(MyAppStudents, '/api/students')
api.add_resource(MyAppStudent, '/api/students/<int:id>')

if __name__ == '__main__':
    app.run(debug=True)
