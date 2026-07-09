<script setup>
import { defineEmits, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useBlockbuster } from '@/stores/blockbuster'

const emit = defineEmits(['submit'])
const router = useRouter()
const blockbuster = useBlockbuster()

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({}),
  },
  loading: Boolean,
})

const title = ref(props.initialValues.title || '')
const embedCode = ref(props.initialValues.embedCode || '')
const status = ref(props.initialValues.status || 'draft')
const publishDate = ref(props.initialValues.publishDate || '')
const genres = ref(props.initialValues.genres || [])
const tags = ref(props.initialValues.tags || [])
const thumbnail = ref(null)
const featured = ref(props.initialValues.featured || false)

// if the parent loads initialValues asynchronously (eg after fetching the video)
// watch for changes and update the form fields accordingly
watch(
  () => props.initialValues,
  (vals) => {
    title.value = vals.title || ''
    embedCode.value = vals.embedCode || ''
    status.value = vals.status || 'draft'
    publishDate.value = vals.publishDate || ''
    genres.value = vals.genres || []
    tags.value = vals.tags || []
    featured.value = vals.featured || false
  },
)

function handleFileChange(e) {
  thumbnail.value = e.target.files[0]
}

function handleSubmit() {
  emit('submit', {
    title: title.value,
    embedCode: embedCode.value,
    status: status.value,
    publishDate: publishDate.value,
    genres: genres.value,
    tags: tags.value,
    thumbnail: thumbnail.value,
    featured: featured.value,
  })
}
</script>

<template>
  <div class="form-wrapper">
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" placeholder="Enter post title" required />
      </div>

      <div class="field">
        <label for="embed-code">Embed Code</label>
        <textarea
          id="embed-code"
          v-model="embedCode"
          placeholder="... embed code here ..."
        ></textarea>
      </div>

      <div class="two-col">
        <div class="field">
          <label for="status">Status</label>
          <select id="status" v-model="status">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div class="field">
          <label for="publish-date">Publish Date</label>
          <input id="publish-date" v-model="publishDate" type="date" />
        </div>
      </div>

      <div class="field">
        <label>Genre</label>
        <div class="radio-group">
          <label class="check-row">
            <input type="checkbox" v-model="genres" value="action" /> Action
          </label>

          <label class="check-row">
            <input type="checkbox" v-model="genres" value="drama" /> Drama
          </label>

          <label class="check-row">
            <input type="checkbox" v-model="genres" value="romance" /> Romance
          </label>
        </div>
      </div>

      <div class="field">
        <label for="thumbnail">Thumbnail</label>
        <input id="thumbnail" type="file" accept="image/*" @change="handleFileChange" />
      </div>

      <div class="field">
        <div class="toggle-row">
          <span class="toggle-label">Feature this video</span>
          <label class="toggle">
            <input v-model="featured" type="checkbox" />
            <span class="slider-track"></span>
          </label>
        </div>
      </div>

      <p v-if="blockbuster.error" class="error">{{ blockbuster.error }}</p>

      <div class="form-actions">
        <button type="button" class="btn-ghost" @click="router.push('/dashboard')">Cancel</button>
        <button type="submit" class="btn-primary" :disabled="blockbuster.loading">
          {{ blockbuster.loading ? 'Saving...' : 'Publish' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  max-width: 680px;
  margin: 2rem auto;
  padding: 0 1rem;
}

form {
  background: #1c1c1c;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 1.5rem;
}

h2 {
  margin: 0 0 1.5rem;
  font-size: 16px;
  font-weight: 500;
  color: #e5e7eb;
}

.field {
  margin-bottom: 1.25rem;
}

.field label {
  display: block;
  font-size: 13px;
  color: #9ca3af;
  margin-bottom: 6px;
}

input[type='text'],
input[type='date'],
textarea,
select {
  width: 100%;
  box-sizing: border-box;
  background: #141414;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  color: #e5e7eb;
  font-size: 14px;
  padding: 8px 12px;
  outline: none;
  transition: border-color 0.15s;
}

input[type='text']:focus,
input[type='date']:focus,
textarea:focus,
select:focus {
  border-color: #4b5563;
}

textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
}

select option {
  background: #1c1c1c;
}

input[type='range'] {
  width: 100%;
  accent-color: #6b7280;
}

input[type='file'] {
  width: 100%;
  box-sizing: border-box;
  background: #141414;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  color: #9ca3af;
  font-size: 13px;
  padding: 8px 12px;
}
</style>
