/**
 * Animal sounds — local files saved in public/sounds/
 *
 * Save your downloaded files in public/sounds/ with these exact names:
 *   cat.wav, dog.wav, cow.wav, bird.wav
 *
 * Downloaded from Epidemic Sound:
 * - Cow:  https://www.epidemicsound.com/sound-effects/tracks/6ea040bf-546d-463b-9980-8bee0026117d/
 * - Cat:  https://www.epidemicsound.com/sound-effects/tracks/01e07f04-5cce-4cb9-b99c-8493e69aac62/
 * - Dog:  https://www.epidemicsound.com/sound-effects/tracks/8cde9aa4-a6bc-4dcf-bfb8-b38ed67a18f4/
 * - Bird: https://www.epidemicsound.com/sound-effects/tracks/ec9224c4-ac9b-432b-b046-95ec919b2961/
 *
 * "file" is relative to the site root (public/ folder).
 * "duration" trims long clips (seconds); set to null to play the whole file.
 */
export const ANIMAL_SOUND_CLIPS = {
  cat: {
    file: 'sounds/cat.wav',
    volume: 1.0,
    duration: null,
  },
  dog: {
    file: 'sounds/dog.wav',
    volume: 1.0,
    duration: null,
  },
  cow: {
    file: 'sounds/cow.wav',
    volume: 1.0,
    duration: null,
  },
  bird: {
    file: 'sounds/bird.wav',
    volume: 1.0,
    duration: null,
  },
}
