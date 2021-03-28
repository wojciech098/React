<template>
  <v-container class="exam-header">
    <h1>Egzaminy dla kursu {{ $route.query.title }}</h1>
    <v-row>
      <div class="course" v-for="exam in exams">
        <div class="header">
          <div class="title">{{ exam.description }}</div>
          <v-icon color="white" v-show="exam.isPassed">mdi-check</v-icon>
          <v-icon color="white" v-show="!exam.isPassed">mdi-close</v-icon>
        </div>
        <div class="options">
          <v-btn color="primary" plain @click="OpenEditDialog(exam)">Edytuj</v-btn>
          <v-btn color="warning" plain @click="SetPass(exam)" v-show="!exam.isPassed">Oznacz jako zdany</v-btn>
          <v-btn color="error" plain @click="RemoveExam(exam)">Usuń</v-btn>
        </div>
      </div>
      <div class="course">
        <div class="header">
          <v-text-field v-model="newExam.description" label="Opis egzaminu" class="form" color="white"
                        dark></v-text-field>
        </div>
        <div class="description">
        </div>
        <div class="options">
          <v-btn @click="AddNewExam">Dodaj</v-btn>
        </div>
      </div>
    </v-row>
    <v-snackbar :timeout="700" v-model="snackbar" centered color="success">
      <v-icon>mdi-check</v-icon>
      Wykonano
    </v-snackbar>
    <v-dialog
        v-model="editDialog"
        persistent
        max-width="400"
    >
      <v-card>
        <v-card-title class="headline">
          Aktualizujesz egzamin {{ editedExam.oldDescription }}
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editedExam.description" label="Opis przedmiotu"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="editDialog = false"
          >
            Odrzuć
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click="EditExam"
          >
            Zapisz
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "Exams",
  data: () => {
    return {
      exams: [],
      newExam: {
        description: null
      },
      snackbar: false,
      editedExam: {
        id: null,
        description: null,
        oldDescription: null,
        courseId: null
      },
      editDialog: false
    }
  },
  mounted() {
    axios.get(`https://zaliczenie.btry.eu/api/Course/${this.$route.query.courseId}`,
        {
          headers: {Authorization: `Bearer ${this.$store.state.token}`}
        })
        .then(response => {
          this.exams = response.data.record.exams
        })
  },
  methods: {
    AddNewExam() {
      axios.post(`https://zaliczenie.btry.eu/api/Exams`,
          {
            description: this.newExam.description,
            courseId: this.$route.query.courseId
          },
          {
            headers: {Authorization: `Bearer ${this.$store.state.token}`}
          })
          .then(response => {
            this.exams.push(response.data.record)
            this.newExam.description = null
            this.snackbar = true
          })
    },
    SetPass(exam) {
      axios.put(`https://zaliczenie.btry.eu/api/Exams/${exam.id}`,
          {},
          {
            headers: {Authorization: `Bearer ${this.$store.state.token}`}
          })
          .then(() => {
            this.exams = this.exams.map(i => {
              if (i.id === exam.id) i.isPassed = true
              return i
            })
            this.snackbar = true
          })
    },
    RemoveExam(exam) {
      axios.delete(`https://zaliczenie.btry.eu/api/Exams/${exam.id}`,
          {
            headers: {Authorization: `Bearer ${this.$store.state.token}`}
          })
          .then(() => {
            this.exams = this.exams.filter(i => {
              if (i.id !== exam.id) return i
            })
            this.snackbar = true
          })
    },
    OpenEditDialog(exam) {
      this.editedExam.description = exam.description
      this.editedExam.id = exam.id
      this.editedExam.oldDescription = exam.description
      this.editedExam.courseId = exam.courseId
      this.editDialog = true
    },
    EditExam() {
      console.log(this.editedExam)
      axios.put(`https://zaliczenie.btry.eu/api/Exams`,
          this.editedExam,
          {
            headers: {Authorization: `Bearer ${this.$store.state.token}`}
          })
          .then(() => {
                this.exams = this.exams.map(i => {
                  if (i.id === this.editedExam.id) i.description = this.editedExam.description
                  return i
                })
                this.snackbar = true
              }
          )
    }
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

  .header {
    background-color: #1866bf;
    color: #fff;
    padding: .5rem 1rem;
    border-radius: .4rem .4rem 0 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
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