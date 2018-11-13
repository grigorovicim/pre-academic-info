CREATE TABLE "User" (
  "id" int,
  "username" varchar,
  "password" varchar,
  "role_id" int,
  "is_active" bool,
  "created_on" timestamp
);

CREATE TABLE "Profile" (
  "id" int,
  "user_id" int,
  "first_name" varchar,
  "last_name" varchar,
  "personal_email" varchar,
  "telephone_number" varchar,
  "gender" int,
  "date_of_birth" timestamp,
  "cnp" varchar
);

CREATE TABLE "Student" (
  "id" int,
  "profile_id" int,
  "academic_programme" int,
  "section_id" int,
  "form_of_study_id" int,
  "year_of_study" int,
  "semester_id" int,
  "group_id" int
);

CREATE TABLE "Professor" (
  "id" int,
  "profile_id" int,
  "nickname" varchar,
  "title" int
);

CREATE TABLE "Course" (
  "id" int,
  "name" varchar,
  "description" varchar,
  "credits" int,
  "academic_programme" int,
  "section_id" int,
  "year_of_study" int,
  "semester_id" int,
  "form_of_evaluation" int,
  "is_active" bool,
  "owner_id" int
);

CREATE TABLE "Syllabus" (
  "id" int,
  "professor_id" int,
  "course_id" int,
  "year" int
);

CREATE TABLE "ProfessorCourse" (
  "id" int,
  "professor_id" int,
  "course_id" int,
  "year" int,
  "is_teaching_seminar" bool,
  "is_teaching_lab" bool,
  "is_teaching_course" bool
);

CREATE TABLE "StudentCourse" (
  "id" int,
  "student_id" int,
  "course_id" int,
  "year" int
);

CREATE TABLE "Group" (
  "id" int,
  "group_number" int
);

CREATE TABLE "SeminarActivity" (
  "id" int,
  "student_id" int,
  "course_id" int,
  "professor_id" int,
  "date_of_activity" timestamp,
  "grade" float
);

CREATE TABLE "LabActivity" (
  "id" int,
  "student_id" int,
  "course_id" int,
  "professor_id" int,
  "date_of_activity" timestamp,
  "grade" float
);

CREATE TABLE "LabPresence" (
  "id" int,
  "student_id" int,
  "course_id" int,
  "professor_id" int,
  "date_of_presence" timestamp
);

CREATE TABLE "SeminarPresence" (
  "id" int,
  "student_id" int,
  "course_id" int,
  "professor_id" int,
  "date_of_presence" timestamp
);

CREATE TABLE "ExamResults" (
  "id" int,
  "student_id" int,
  "course_id" int,
  "grade" float
);

CREATE TABLE "Role" (
  "id" int,
  "label" varchar
);

CREATE TABLE "Gender" (
  "id" int,
  "label" varchar
);

CREATE TABLE "Section" (
  "id" int,
  "name" varchar,
  "abbreviation_id" int
);

CREATE TABLE "Abbreviation" (
  "id" int,
  "label" varchar
);

CREATE TABLE "FormOfStudy" (
  "id" int,
  "label" varchar
);

CREATE TABLE "YearOfStudy" (
  "id" int,
  "label" varchar
);

CREATE TABLE "AcademicProgramme" (
  "id" int,
  "label" varchar
);

CREATE TABLE "Title" (
  "id" int,
  "label" varchar
);

CREATE TABLE "Semester" (
  "id" int,
  "label" varchar
);

CREATE TABLE "FormOfEvaluation" (
  "id" int,
  "label" varchar
);

ALTER TABLE "Profile" ADD PRIMARY KEY("id");

ALTER TABLE "Profile" ADD UNIQUE("user_id");

ALTER TABLE "User" ADD FOREIGN KEY ("id") REFERENCES "Profile" ("user_id");

ALTER TABLE "Student" ADD UNIQUE("group_id");

ALTER TABLE "Group" ADD FOREIGN KEY ("id") REFERENCES "Student" ("group_id");

ALTER TABLE "Gender" ADD PRIMARY KEY("id");

ALTER TABLE "Profile" ADD FOREIGN KEY ("gender") REFERENCES "Gender" ("id");

ALTER TABLE "Role" ADD PRIMARY KEY("id");

ALTER TABLE "User" ADD FOREIGN KEY ("role_id") REFERENCES "Role" ("id");

ALTER TABLE "Student" ADD UNIQUE ("profile_id");

ALTER TABLE "Profile" ADD FOREIGN KEY ("id") REFERENCES "Student" ("profile_id");

ALTER TABLE "Section" ADD PRIMARY KEY("id");

ALTER TABLE "Student" ADD FOREIGN KEY ("section_id") REFERENCES "Section" ("id");

ALTER TABLE "FormOfStudy" ADD PRIMARY KEY("id");

ALTER TABLE "Student" ADD FOREIGN KEY ("form_of_study_id") REFERENCES "FormOfStudy" ("id");

ALTER TABLE "AcademicProgramme" ADD PRIMARY KEY("id");


ALTER TABLE "Student" ADD FOREIGN KEY ("academic_programme") REFERENCES "AcademicProgramme" ("id");

ALTER TABLE "YearOfStudy" ADD PRIMARY KEY("id");

ALTER TABLE "Student" ADD FOREIGN KEY ("year_of_study") REFERENCES "YearOfStudy" ("id");

ALTER TABLE "Title" ADD PRIMARY KEY("id");

ALTER TABLE "Professor" ADD FOREIGN KEY ("title") REFERENCES "Title" ("id");

ALTER TABLE "Professor" ADD UNIQUE("profile_id");

ALTER TABLE "Profile" ADD FOREIGN KEY ("id") REFERENCES "Professor" ("profile_id");

ALTER TABLE "Course" ADD FOREIGN KEY ("section_id") REFERENCES "Section" ("id");

ALTER TABLE "Course" ADD FOREIGN KEY ("academic_programme") REFERENCES "AcademicProgramme" ("id");

ALTER TABLE "Course" ADD FOREIGN KEY ("year_of_study") REFERENCES "YearOfStudy" ("id");

ALTER TABLE "Semester" ADD PRIMARY KEY ("id");

ALTER TABLE "Course" ADD FOREIGN KEY ("semester_id") REFERENCES "Semester" ("id");

ALTER TABLE "FormOfEvaluation" ADD PRIMARY KEY ("id");

ALTER TABLE "Course" ADD FOREIGN KEY ("form_of_evaluation") REFERENCES "FormOfEvaluation" ("id");

ALTER TABLE "Professor" ADD PRIMARY KEY ("id");

ALTER TABLE "Syllabus" ADD FOREIGN KEY ("professor_id") REFERENCES "Professor" ("id");

ALTER TABLE "Course" ADD PRIMARY KEY ("id");

ALTER TABLE "Syllabus" ADD FOREIGN KEY ("course_id") REFERENCES "Course" ("id");

ALTER TABLE "ProfessorCourse" ADD FOREIGN KEY ("course_id") REFERENCES "Course" ("id");

ALTER TABLE "ProfessorCourse" ADD FOREIGN KEY ("professor_id") REFERENCES "Professor" ("id");

ALTER TABLE "Student" ADD PRIMARY KEY ("id");

ALTER TABLE "StudentCourse" ADD FOREIGN KEY ("student_id") REFERENCES "Student" ("id");

ALTER TABLE "StudentCourse" ADD FOREIGN KEY ("course_id") REFERENCES "Course" ("id");

ALTER TABLE "SeminarPresence" ADD FOREIGN KEY ("student_id") REFERENCES "Student" ("id");

ALTER TABLE "SeminarActivity" ADD FOREIGN KEY ("student_id") REFERENCES "Student" ("id");

ALTER TABLE "LabPresence" ADD FOREIGN KEY ("student_id") REFERENCES "Student" ("id");

ALTER TABLE "LabActivity" ADD FOREIGN KEY ("student_id") REFERENCES "Student" ("id");

ALTER TABLE "SeminarPresence" ADD FOREIGN KEY ("course_id") REFERENCES "Course" ("id");

ALTER TABLE "SeminarActivity" ADD FOREIGN KEY ("course_id") REFERENCES "Course" ("id");

ALTER TABLE "LabPresence" ADD FOREIGN KEY ("course_id") REFERENCES "Course" ("id");

ALTER TABLE "LabActivity" ADD FOREIGN KEY ("course_id") REFERENCES "Course" ("id");

ALTER TABLE "LabPresence" ADD FOREIGN KEY ("professor_id") REFERENCES "Professor" ("id");

ALTER TABLE "SeminarPresence" ADD FOREIGN KEY ("professor_id") REFERENCES "Professor" ("id");

ALTER TABLE "LabActivity" ADD FOREIGN KEY ("professor_id") REFERENCES "Professor" ("id");

ALTER TABLE "SeminarActivity" ADD FOREIGN KEY ("professor_id") REFERENCES "Professor" ("id");

ALTER TABLE "Course" ADD FOREIGN KEY ("owner_id") REFERENCES "Professor" ("id");

ALTER TABLE "ExamResults" ADD FOREIGN KEY ("course_id") REFERENCES "Course" ("id");

ALTER TABLE "ExamResults" ADD FOREIGN KEY ("student_id") REFERENCES "Student" ("id");

ALTER TABLE "Section" ADD UNIQUE ("abbreviation_id");

ALTER TABLE "Abbreviation" ADD FOREIGN KEY ("id") REFERENCES "Section" ("abbreviation_id");

