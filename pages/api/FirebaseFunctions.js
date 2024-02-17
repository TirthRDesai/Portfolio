import initializeApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/performance'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
    apiKey: process.env.FirebaseApiKey,
    authDomain: process.env.FirebaseAuthDomain,
    projectId: process.env.FirebaseProjectId,
    storageBucket: process.env.FirebaseStorageBucket,
    messagingSenderId: process.env.FirebaseMessagingSenderId,
    appId: process.env.FirebaseAppId,
    measurementId: process.env.FirebaseMeasurementId
}

const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export default app