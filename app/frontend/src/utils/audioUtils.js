/**
 * Audio utilities for recording and processing
 */

/**
 * Convert audio blob to base64
 * @param {Blob} blob - Audio blob
 * @returns {Promise<string>} Base64 encoded string
 */
export async function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Download audio blob as file
 * @param {Blob} blob - Audio blob
 * @param {string} filename - Filename to save as
 */
export function downloadAudio(blob, filename = "recording.wav") {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Get duration of audio blob
 * @param {Blob} blob - Audio blob
 * @returns {Promise<number>} Duration in seconds
 */
export async function getAudioDuration(blob) {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.onloadedmetadata = () => resolve(audio.duration);
    audio.onerror = () => reject(new Error("Failed to load audio"));
    audio.src = URL.createObjectURL(blob);
  });
}

/**
 * Format seconds to MM:SS
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted time string
 */
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Check if browser supports Web Audio API
 * @returns {boolean}
 */
export function isAudioSupported() {
  return !!(
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia &&
    window.AudioContext &&
    window.MediaRecorder
  );
}

/**
 * Compress audio using Web Audio API
 * @param {Blob} blob - Audio blob
 * @returns {Promise<Blob>} Compressed audio blob
 */
export async function compressAudio(blob) {
  try {
    const arrayBuffer = await blob.arrayBuffer();
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Simple compression: reduce sample rate
    const offlineContext = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      audioBuffer.length * 0.5,
      audioBuffer.sampleRate * 0.5
    );

    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineContext.destination);
    source.start();

    const renderedBuffer = await offlineContext.startRendering();
    return renderedBuffer;
  } catch (error) {
    console.error("Audio compression failed:", error);
    return blob;
  }
}
