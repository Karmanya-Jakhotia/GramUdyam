import { useState } from "react";
import "./App.css";

const languages = {
  Hindi: "hi-IN",
  English: "en-IN",
  Tamil: "ta-IN",
  Telugu: "te-IN",
  Kannada: "kn-IN",
  Malayalam: "ml-IN",
  Marathi: "mr-IN",
  Gujarati: "gu-IN",
  Bengali: "bn-IN",
  Punjabi: "pa-IN",
  Odia: "od-IN",
};

function App() {
  const [language, setLanguage] = useState("hi-IN");
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  // Store recorder so we can stop it manually
  const [mediaRecorder, setMediaRecorder] = useState(null);

  // ==============================
  // START RECORDING
  // ==============================

  const recordAudio = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      const recorder = new MediaRecorder(stream);

      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        // Stop microphone
        stream.getTracks().forEach((track) => track.stop());

        const audioBlob = new Blob(chunks, {
          type: "audio/webm",
        });

        setMediaRecorder(null);

        await sendAudio(audioBlob);
      };

      // Start recording
      recorder.start();

      setMediaRecorder(recorder);
      setRecording(true);

      // IMPORTANT:
      // There is NO 5-second timer anymore.
      // Recording continues until user presses Stop & Send.

    } catch (error) {
      console.error("Microphone error:", error);

      alert(
        "Microphone permission is required. Please allow microphone access."
      );
    }
  };

  // ==============================
  // STOP RECORDING
  // ==============================

  const stopRecording = () => {
    if (
      mediaRecorder &&
      mediaRecorder.state === "recording"
    ) {
      mediaRecorder.stop();

      setRecording(false);
    }
  };

  // ==============================
  // SEND AUDIO TO BACKEND
  // ==============================

  const sendAudio = async (audioBlob) => {
    setLoading(true);
    setTranscript("");
    setReply("");

    try {
      const formData = new FormData();

      formData.append(
        "audio",
        audioBlob,
        "voice.webm"
      );

      formData.append(
        "languageCode",
        language
      );

      const response = await fetch(
        "http://localhost:5000/api/speech-to-text",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Speech recognition failed"
        );
      }

      const text = data.transcript;

      if (!text || text.trim() === "") {
        throw new Error(
          "Could not understand the voice. Please try again."
        );
      }

      // Show what user said
      setTranscript(text);

      // Generate GramUdyam response
      const generatedReply =
        createReply(text);

      setReply(generatedReply);

      // Speak the response
      await speakReply(generatedReply);

    } catch (error) {
      console.error(
        "Speech processing error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // CREATE AI-STYLE REPLY
  // ==============================

  const createReply = (text) => {
    if (!text) {
      const messages = {
        "hi-IN":
          "मैं आपकी बात समझ नहीं पाया। कृपया दोबारा बोलें।",

        "en-IN":
          "I could not understand your voice. Please try again.",

        "ta-IN":
          "உங்கள் குரலை என்னால் புரிந்துகொள்ள முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",

        "te-IN":
          "మీ మాట నాకు అర్థం కాలేదు. దయచేసి మళ్లీ ప్రయత్నించండి.",

        "kn-IN":
          "ನಿಮ್ಮ ಮಾತು ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",

        "ml-IN":
          "നിങ്ങളുടെ ശബ്ദം എനിക്ക് മനസ്സിലായില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.",

        "mr-IN":
          "तुमचे बोलणे मला समजले नाही. कृपया पुन्हा प्रयत्न करा.",

        "gu-IN":
          "તમારો અવાજ મને સમજાયો નથી. કૃપા કરીને ફરી પ્રયાસ કરો.",

        "bn-IN":
          "আমি আপনার কথা বুঝতে পারিনি। অনুগ্রহ করে আবার চেষ্টা করুন।",

        "pa-IN":
          "ਮੈਂ ਤੁਹਾਡੀ ਗੱਲ ਸਮਝ ਨਹੀਂ ਸਕਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",

        "od-IN":
          "ମୁଁ ଆପଣଙ୍କ କଥା ବୁଝିପାରିଲି ନାହିଁ। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
      };

      return (
        messages[language] ||
        messages["en-IN"]
      );
    }

    /*
      V1 PROTOTYPE RESPONSE

      Later your teammates can replace this
      function with the actual GramUdyam AI API.

      For now it demonstrates:
      Voice → Text → Business Response
    */

    const replies = {
      "hi-IN": `
आपने कहा: ${text}

यह GramUdyam का प्रारंभिक व्यवसाय सलाहकार उत्तर है।

आपके व्यवसाय के लिए हम आपके बजट, स्थान, बाजार की मांग, लागत और उपलब्ध सरकारी योजनाओं का विश्लेषण कर सकते हैं।

अगले चरण में हम व्यवसाय की व्यवहार्यता, अनुमानित लागत, जोखिम और संभावित योजनाओं की जानकारी देंगे।
`,

      "en-IN": `
You said: ${text}

This is the initial GramUdyam business advisor response.

We can analyze your budget, location, market demand, operating costs and available government schemes.

The next step is to evaluate business feasibility, estimated investment, risks and suitable schemes.
`,

      "ta-IN": `
நீங்கள் கூறியது: ${text}

இது GramUdyam-ன் ஆரம்ப வணிக ஆலோசனை பதில்.

உங்கள் பட்ஜெட், இடம், சந்தை தேவை, செலவுகள் மற்றும் கிடைக்கக்கூடிய அரசு திட்டங்களை நாங்கள் ஆய்வு செய்யலாம்.

அடுத்த கட்டத்தில் வணிக சாத்தியக்கூறு, முதலீடு, அபாயங்கள் மற்றும் பொருத்தமான திட்டங்களை மதிப்பிடலாம்.
`,

      "te-IN": `
మీరు చెప్పింది: ${text}

ఇది GramUdyam ప్రారంభ వ్యాపార సలహా సమాధానం.

మీ బడ్జెట్, ప్రాంతం, మార్కెట్ డిమాండ్, ఖర్చులు మరియు అందుబాటులో ఉన్న ప్రభుత్వ పథకాలను మేము విశ్లేషించవచ్చు.

తదుపరి దశలో వ్యాపార సాధ్యత, పెట్టుబడి, ప్రమాదాలు మరియు సరైన పథకాలను అంచనా వేయవచ్చు.
`,

      "kn-IN": `
ನೀವು ಹೇಳಿದ್ದು: ${text}

ಇದು GramUdyam ನ ಪ್ರಾಥಮಿಕ ವ್ಯವಹಾರ ಸಲಹೆ ಉತ್ತರವಾಗಿದೆ.

ನಿಮ್ಮ ಬಜೆಟ್, ಸ್ಥಳ, ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆ, ವೆಚ್ಚಗಳು ಮತ್ತು ಲಭ್ಯವಿರುವ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ನಾವು ವಿಶ್ಲೇಷಿಸಬಹುದು.

ಮುಂದಿನ ಹಂತದಲ್ಲಿ ವ್ಯವಹಾರದ ಸಾಧ್ಯತೆ, ಹೂಡಿಕೆ, ಅಪಾಯಗಳು ಮತ್ತು ಸೂಕ್ತ ಯೋಜನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಬಹುದು.
`,

      "ml-IN": `
നിങ്ങൾ പറഞ്ഞത്: ${text}

ഇത് GramUdyam-ന്റെ പ്രാഥമിക ബിസിനസ് ഉപദേശമാണ്.

നിങ്ങളുടെ ബജറ്റ്, സ്ഥലം, വിപണി ആവശ്യം, ചെലവുകൾ, ലഭ്യമായ സർക്കാർ പദ്ധതികൾ എന്നിവ ഞങ്ങൾ വിശകലനം ചെയ്യാം.

അടുത്ത ഘട്ടത്തിൽ ബിസിനസിന്റെ സാധ്യത, നിക്ഷേപം, അപകടസാധ്യതകൾ, അനുയോജ്യമായ പദ്ധതികൾ എന്നിവ വിലയിരുത്താം.
`,

      "mr-IN": `
तुम्ही म्हणालात: ${text}

हे GramUdyam चे प्राथमिक व्यवसाय सल्ला उत्तर आहे.

तुमचे बजेट, स्थान, बाजारपेठेची मागणी, खर्च आणि उपलब्ध सरकारी योजना यांचे विश्लेषण करता येईल.

पुढील टप्प्यात व्यवसायाची व्यवहार्यता, गुंतवणूक, जोखीम आणि योग्य योजनांचे मूल्यांकन करता येईल.
`,

      "gu-IN": `
તમે કહ્યું: ${text}

આ GramUdyam નો પ્રારંભિક વ્યવસાય સલાહકાર જવાબ છે.

અમે તમારા બજેટ, સ્થાન, બજારની માંગ, ખર્ચ અને ઉપલબ્ધ સરકારી યોજનાઓનું વિશ્લેષણ કરી શકીએ છીએ.

આગળના તબક્કામાં વ્યવસાયની શક્યતા, રોકાણ, જોખમો અને યોગ્ય યોજનાઓનું મૂલ્યાંકન કરી શકીએ છીએ.
`,

      "bn-IN": `
আপনি বলেছেন: ${text}

এটি GramUdyam-এর প্রাথমিক ব্যবসায়িক পরামর্শ।

আমরা আপনার বাজেট, অবস্থান, বাজারের চাহিদা, খরচ এবং উপলব্ধ সরকারি প্রকল্প বিশ্লেষণ করতে পারি।

পরবর্তী ধাপে ব্যবসার সম্ভাব্যতা, বিনিয়োগ, ঝুঁকি এবং উপযুক্ত প্রকল্প মূল্যায়ন করা যাবে।
`,

      "pa-IN": `
ਤੁਸੀਂ ਕਿਹਾ: ${text}

ਇਹ GramUdyam ਦਾ ਸ਼ੁਰੂਆਤੀ ਕਾਰੋਬਾਰੀ ਸਲਾਹਕਾਰ ਜਵਾਬ ਹੈ।

ਅਸੀਂ ਤੁਹਾਡੇ ਬਜਟ, ਸਥਾਨ, ਮਾਰਕੀਟ ਦੀ ਮੰਗ, ਖਰਚੇ ਅਤੇ ਉਪਲਬਧ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਸਕਦੇ ਹਾਂ।

ਅਗਲੇ ਪੜਾਅ ਵਿੱਚ ਕਾਰੋਬਾਰ ਦੀ ਸੰਭਾਵਨਾ, ਨਿਵੇਸ਼, ਜੋਖਮ ਅਤੇ ਢੁਕਵੀਆਂ ਯੋਜਨਾਵਾਂ ਦਾ ਮੁਲਾਂਕਣ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ।
`,

      "od-IN": `
ଆପଣ କହିଛନ୍ତି: ${text}

ଏହା GramUdyam ର ପ୍ରାରମ୍ଭିକ ବ୍ୟବସାୟ ପରାମର୍ଶ ଉତ୍ତର।

ଆମେ ଆପଣଙ୍କ ବଜେଟ୍, ସ୍ଥାନ, ବଜାର ଚାହିଦା, ଖର୍ଚ୍ଚ ଏବଂ ଉପଲବ୍ଧ ସରକାରୀ ଯୋଜନା ବିଶ୍ଳେଷଣ କରିପାରିବା।

ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପରେ ବ୍ୟବସାୟର ସମ୍ଭାବ୍ୟତା, ନିବେଶ, ବିପଦ ଏବଂ ଉପଯୁକ୍ତ ଯୋଜନା ମୂଲ୍ୟାୟନ କରାଯାଇପାରିବ।
`,
    };

    return (
      replies[language] ||
      replies["en-IN"]
    );
  };

  // ==============================
  // TEXT TO SPEECH
  // ==============================

  const speakReply = async (text) => {
    const response = await fetch(
      "http://localhost:5000/api/text-to-speech",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          text,
          languageCode: language,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ||
          "Text-to-speech failed"
      );
    }

    if (!data.audio) {
      throw new Error(
        "No audio received from server."
      );
    }

    const audio = new Audio(
      `data:audio/wav;base64,${data.audio}`
    );

    await audio.play();
  };

  // ==============================
  // UI
  // ==============================

  return (
    <div className="app">

      <h1>GramUdyam</h1>

      <p className="subtitle">
        Multilingual AI Business Assistant
      </p>

      <div className="card">

        <label>
          Select your language
        </label>

        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);

            // Clear previous results
            setTranscript("");
            setReply("");
          }}
          disabled={recording || loading}
        >
          {Object.entries(languages).map(
            ([name, code]) => (
              <option
                key={code}
                value={code}
              >
                {name}
              </option>
            )
          )}
        </select>

        {/* SPEAK / STOP BUTTON */}

        <button
          className={
            recording ? "recording" : ""
          }
          onClick={
            recording
              ? stopRecording
              : recordAudio
          }
          disabled={loading}
        >
          {recording
            ? "⏹️ Stop & Send"
            : "🎤 Speak"}
        </button>

        {/* PROCESSING */}

        {loading && (
          <p className="status">
            🤖 Processing your voice...
          </p>
        )}

        {/* TRANSCRIPT */}

        {transcript && (
          <div className="result">

            <h3>
              📝 You said
            </h3>

            <p>
              {transcript}
            </p>

          </div>
        )}

        {/* AI REPLY */}

        {reply && (
          <div className="result">

            <h3>
              🤖 GramUdyam Reply
            </h3>

            <p>
              {reply}
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;