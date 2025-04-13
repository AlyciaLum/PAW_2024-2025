__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Alicja Lum 4D"

import datetime
import json
from models.Student import Student
from models.teacher import Teacher
from models.subject import Subject
from models.grades import Grades
from year_grade import year_grade

teachers: list[Teacher] = []
subjects: list[Subject] = []
students: list[Student] = []
grades: list[Grades] = []

with open("teachers.txt", "r", encoding="utf-8") as file:
    for line in file:
        parts = line.strip().split()
        if len(parts) == 3:
            _id, name, surname = parts
            teachers.append(Teacher(int(_id), name, surname))

with open("subjects.txt", "r", encoding="utf-8") as file:
    for line in file:
        parts = line.strip().split()
        if len(parts) == 3:
            _id, subject_name, teacher_id = parts
            teacher = next((t for t in teachers if t._id == int(teacher_id)), None)
            if teacher:
                subjects.append(Subject(int(_id), subject_name, teacher))

with open("students.txt", "r", encoding="utf-8") as file:
    for line in file:
        parts = line.strip().split()
        if len(parts) == 4:
            _id, first_name, last_name, birthdate_str = parts
            birthdate = datetime.datetime.strptime(birthdate_str, '%Y-%m-%d').date()
            students.append(Student(int(_id), first_name, last_name, birthdate))

with open("grades.txt", "r", encoding="utf-8") as file:
    for line in file:
        parts = line.strip().split()
        if len(parts) >= 3:
            student_id = int(parts[0])
            subject_id = int(parts[1])
            grade_values = list(map(int, parts[2].split(",")))

            student = next((s for s in students if s._id == student_id), None)
            subject = next((sub for sub in subjects if sub._id == subject_id), None)

            if student and subject:
                g = Grades(student, subject)
                for grade in grade_values:
                    try:
                        g.add_grade(grade)
                    except ValueError:
                        pass
                grades.append(g)

print("Oceny i średnie poszczególnych uczniów.\n")

students_data: list[dict] = []

for student in students:
    student_grades = [g for g in grades if g.student == student]
    key = f"{student.first_name} {student.last_name} ({student.age})"
    student_record: dict = {}

    print(f"{key}:")

    for grade_entry in student_grades:
        subject = grade_entry.subject.name
        grade_list = grade_entry.get_grades()
        average = round(grade_entry.get_average(), 2)
        final = year_grade(average)

        print(f"{subject}:")
        print(f"Oceny: {', '.join(map(str, grade_list))}")
        print(f"Średnia: {average}")
        print(f"Ocena końcowa: {final}")

        student_record[subject] = {
            "Oceny": ", ".join(map(str, grade_list)),
            "Srednia": average,
            "Ocena roczna": final
        }

    students_data.append({key: student_record})
    print()

with open("students.json", "w", encoding="utf-8") as json_file:
    json.dump(students_data, json_file, indent=4, ensure_ascii=False)

print("=" * 50)
print()

subjects_data: list[dict] = []

for subject in subjects:
    subject_grades: list[int] = []

    for g in grades:
        if g.subject == subject:
            subject_grades.extend(g.get_grades())

    if not subject_grades:
        continue

    average = round(sum(subject_grades) / len(subject_grades), 2)

    print(f"{subject.name}:")
    print(f"Nauczyciel: {subject.teacher.name} {subject.teacher.surname}")
    print(f"Oceny: {', '.join(map(str, subject_grades))}")
    print(f"Średnia: {average}")
    print()

    subjects_data.append({
        subject.name: {
            "Nauczyciel": f"{subject.teacher.name} {subject.teacher.surname}",
            "Oceny": subject_grades,
            "Srednia": average
        }
    })

with open("subjects.json", "w", encoding="utf-8") as json_file:
    json.dump(subjects_data, json_file, indent=4, ensure_ascii=False)

