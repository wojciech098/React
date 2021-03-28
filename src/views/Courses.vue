<template>
  <v-container>
    <h1>Twoje kursy</h1>
    <v-row>
      <div class="course" v-for="course in courses">
        <div class="title">{{ course.title }}</div>
        <div class="description">{{ course.description }}</div>
        <div class="options">
          <v-btn color="primary" plain @click="OpenDialog(course)">Edytuj</v-btn>
          <v-btn color="warning" plain
                 @click="$router.push({name: 'Exams', query: {courseId: course.id, title: course.title}})">Przejdź
          </v-btn>
          <v-btn color="error" plain @click="RemoveCourse(course)">Usuń</v-btn>
        </div>
      </div>
      <div class="course">
        <div class="title">
          <v-text-field v-model="newCourse.title" label="Nazwa kursu" class="form" color="white" dark></v-text-field>
        </div>
        <div class="description">
          <v-text-field v-model="newCourse.description" label="Opis kursu" class="form"></v-text-field>
        </div>
        <div class="options">
          <v-btn @click="AddNewCourse">Dodaj</v-btn>
        </div>
      </div>
    </v-row>
    <v-dialog
        v-model="editCourseDialog"
        persistent
        max-width="400"
    >
      <v-card>
        <v-card-title class="headline">
          Aktualizujesz kurs {{ editedCourse.oldTitle }}
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editedCourse.title" label="Nazwa przedmiotu"></v-text-field>
          <v-text-field v-model="editedCourse.description" label="Opis przedmiotu"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="editCourseDialog = false"
          >
            Odrzuć
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click="EditCourse"
          >
            Zapisz
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar :timeout="700" v-model="snackbar" centered color="success">
      <v-icon>mdi-check</v-icon>
      Wykonano
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: "Course",
  data: () => {
    return {
      courses: [],
      newCourse: {
        title: null,
        description: null
      },
      editCourseDialog: false,
      editedCourse: {
        id: null,
        title: null,
        description: null,
        oldName: null
      },
      snackbar: false
    }
  },
  methods: {
    AddNewCourse() {
      const formData = new FormData()
      formData.append('title', this.newCourse.title)
      formData.append('description', this.newCourse.description)

      axios.post(
          'https://zaliczenie.btry.eu/api/Course',
          formData,
          {
            headers: {
              'Authorization': `Bearer ${this.$store.state.token}`,
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            this.courses.push(response.data.record)
            this.newCourse.description = null
            this.newCourse.title = null
          })
      this.snackbar=true
    },
    RemoveCourse(course) {
      axios.delete(
          `https://zaliczenie.btry.eu/api/Course/${course.id}`,
          {
            headers: {
              'Authorization': `Bearer ${this.$store.state.token}`
            }
          }
      ).then(() => {
        this.courses = this.courses.filter((value, index, arr) => {
          return value !== course
        })
        this.snackbar=true
      })
    },
    EditCourse() {
      const formData = new FormData()
      formData.append('id', this.editedCourse.id)
      formData.append('title', this.editedCourse.title)
      formData.append('description', this.editedCourse.description)
      axios.put(`https://zaliczenie.btry.eu/api/Course`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${this.$store.state.token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
      )
          .then(() => {
            this.editCourseDialog = false
            this.courses.map(i => {
              if (i.id === this.editedCourse.id) {
                i.title = this.editedCourse.title
                i.description = this.editedCourse.description
              }
              return i
            })
            this.editedCourse.id = null
            this.editedCourse.title = null
            this.editedCourse.oldName = null
            this.editedCourse.description = null
          })
      this.snackbar=true

    },
    OpenDialog(course) {
      this.editCourseDialog = true
      this.editedCourse.id = course.id
      this.editedCourse.title = course.title
      this.editedCourse.oldTitle = course.title
      this.editedCourse.description = course.description
    }
  },
  mounted() {
    axios.get(
        'https://zaliczenie.btry.eu/api/Course',
        {headers: {'Authorization': `Bearer ${this.$store.state.token}`}}
    )
        .then(response => {
          this.courses = response.data.records
        })
  }
}
</script>

<style scoped lang="scss">
.course {
  display: block;
  width: calc(100% - 2rem);
  border: 1px solid #777;
  box-shadow: 0 0 2px #777;
  border-radius: .4rem;
  margin: 1rem;

  .title {
    background-color: #1866bf;
    color: #fff;
    padding: .5rem 1rem;
    border-radius: .4rem .4rem 0 0;
  }

  .description {
    padding: .5rem 1rem
  }

  .options {
    padding: .5rem 1rem;
    text-align: right;
    border-top: 1px solid #999;
  }

  .form {
    margin: 0;
  }
}
</style>