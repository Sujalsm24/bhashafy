# Voice Input Feature - Implementation Plan

## 🎯 Feature Overview
Enable users to speak directly to the AI chat tutor using their microphone, converting speech to text via OpenAI Whisper API.

## 📋 Requirements

### Backend Changes
1. **Add Whisper API Integration**
   - Endpoint: `POST /api/chat/transcribe`
   - Accept audio file uploads (WAV, MP3, M4A)
   - Return transcribed text + language confidence
   - Error handling for unsupported formats

2. **Database Updates**
   - Store original audio files (optional)
   - Track transcription confidence scores
   - Add voice_enabled flag to user preferences

### Frontend Changes
1. **Microphone Recording**
   - React component: `VoiceRecorder.jsx`
   - Use Web Audio API for recording
   - Visual feedback (waveform, recording indicator)
   - Stop/cancel controls

2. **ChatTutor Integration**
   - Add microphone button to chat interface
   - Auto-send transcribed text to tutor
   - Show recording status
   - Fallback to text input if mic unavailable

3. **User Experience**
   - Request microphone permission on first use
   - Show transcription in real-time if possible
   - Add language selection for Whisper
   - Option to edit transcription before sending

## 🔧 Technical Stack

### Backend
- **Whisper Integration**: `openai-python` library
- **Audio Processing**: `pydub` or `librosa`
- **Validation**: File type and size checks

### Frontend
- **Recording**: `react-mic` or Web Audio API
- **UI**: Tailwind CSS + custom styling
- **State Management**: React Context (existing AuthContext)

## 📁 Files to Create/Modify

### Backend
```
app/backend/
├── server.py (add /api/chat/transcribe endpoint)
├── voice_service.py (NEW - Whisper integration)
└── requirements.txt (add openai, pydub)
```

### Frontend
```
app/frontend/src/
├── components/
│   ├── ChatTutor.jsx (modify - add voice button)
│   └── VoiceRecorder.jsx (NEW - recording component)
├── hooks/
│   └── useVoiceRecorder.js (NEW - custom hook)
└── utils/
    └── audioUtils.js (NEW - audio processing helpers)
```

## 🔄 Implementation Steps

1. **Setup Whisper API**
   - Add OpenAI API key to .env
   - Create voice_service.py with Whisper wrapper
   - Add error handling and logging

2. **Backend Endpoint**
   - Implement `/api/chat/transcribe` POST endpoint
   - Validate audio format and size
   - Call Whisper API
   - Return transcription or error

3. **Frontend Components**
   - Build VoiceRecorder component with Web Audio API
   - Create useVoiceRecorder custom hook
   - Integrate into ChatTutor component
   - Add visual feedback and error handling

4. **Testing**
   - Unit tests for Whisper integration
   - Component tests for VoiceRecorder
   - E2E tests for full voice chat flow
   - Browser compatibility testing

5. **Deployment**
   - Update .env.example with OPENAI_API_KEY
   - Add Whisper limits to rate limiting
   - Monitor API usage and costs
   - Create user documentation

## 🎯 Success Criteria

- ✅ Users can record voice via microphone button
- ✅ Speech is accurately transcribed via Whisper
- ✅ Transcribed text is sent to chat tutor automatically
- ✅ Works on Chrome, Firefox, Safari, Edge
- ✅ Graceful fallback if microphone unavailable
- ✅ User can edit transcription before sending
- ✅ Recording stops automatically after 30 seconds
- ✅ Clear error messages for permission denied

## 📊 Performance Targets

- Transcription latency: < 3 seconds for 30 sec audio
- Recording latency: < 100ms
- Audio file size: < 25MB (Whisper limit)
- Browser support: Chrome 79+, Firefox 76+, Safari 14.1+

## 🚀 Future Enhancements

- [ ] Real-time transcription (WebSockets)
- [ ] Multiple language support detection
- [ ] Audio quality analysis and suggestions
- [ ] Voice analytics and accent feedback
- [ ] Text-to-speech for tutor responses
- [ ] Offline voice recording (Service Worker)

## 📚 Resources

- OpenAI Whisper API: https://platform.openai.com/docs/guides/speech-to-text
- Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- React Hooks: https://react.dev/reference/react
