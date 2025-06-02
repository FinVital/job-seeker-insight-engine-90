
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Link, Brain, FileText, Award, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [apiKey, setApiKey] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
      toast.success("Resume uploaded successfully!");
    } else {
      toast.error("Please upload a PDF file");
    }
  };

  const analyzeResume = async () => {
    if (!apiKey) {
      toast.error("Please enter your OpenAI API key");
      return;
    }
    if (!resumeFile) {
      toast.error("Please upload a resume");
      return;
    }
    if (!jobUrl) {
      toast.error("Please enter a job description URL");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate analysis - in a real implementation, you would:
      // 1. Extract text from PDF using a library like pdf-parse
      // 2. Fetch job description from URL
      // 3. Send both to OpenAI API for analysis
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockAnalysis = `Based on the job description for Senior Software Engineer at TechCorp, here's the analysis:

## 🔍 Strong Alignment

- **Programming Languages**: Strong proficiency in JavaScript, Python, and React aligns perfectly with the required tech stack
- **Experience Level**: 5+ years of software development experience meets the senior-level requirement
- **Cloud Technologies**: AWS experience matches the company's infrastructure needs
- **Team Leadership**: Previous experience leading development teams aligns with the mentorship responsibilities

## ⚠️ Areas for Improvement

- **Missing Keywords**: Resume lacks specific mention of "microservices architecture" and "Docker containers"
- **Industry Experience**: No direct fintech experience, while the role is in financial technology
- **Certifications**: Missing AWS certifications that would strengthen cloud expertise claims
- **Project Scale**: Limited information about handling high-traffic applications (mentioned in JD)

## 📊 Resume Match Score

**Score: 78/100**

Strong technical foundation and relevant experience, but missing some specific keywords and industry background that would make this an ideal match.

## ✅ Recommendations

1. **Add Technical Keywords**: Include "microservices," "Docker," "Kubernetes," and "CI/CD pipelines"
2. **Quantify Achievements**: Add specific metrics about application performance and user scale
3. **Highlight Relevant Projects**: Emphasize any projects involving payment systems or financial data
4. **Consider Certifications**: Pursue AWS Solutions Architect certification
5. **Industry Knowledge**: Research and mention relevant fintech trends or regulations
6. **Soft Skills**: Better highlight communication and mentorship experience`;

      setAnalysis(mockAnalysis);
      toast.success("Analysis completed!");
    } catch (error) {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">AI Recruitment Assistant</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Analyze resumes against job descriptions with AI-powered insights and scoring
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <div className="space-y-6">
            {/* API Key */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  OpenAI Configuration
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Enter your OpenAI API key to enable AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Label htmlFor="apiKey" className="text-sm font-medium text-gray-700">
                  API Key
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            {/* Resume Upload */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Resume Upload
                </CardTitle>
                <CardDescription className="text-green-100">
                  Upload the candidate's resume in PDF format
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <Label htmlFor="resume" className="cursor-pointer">
                    <span className="text-lg font-medium text-gray-700">
                      {resumeFile ? resumeFile.name : "Click to upload resume"}
                    </span>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </Label>
                  <p className="text-sm text-gray-500 mt-2">PDF files only</p>
                </div>
              </CardContent>
            </Card>

            {/* Job Description URL */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Link className="h-5 w-5 mr-2" />
                  Job Description
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Enter the URL of the job posting
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Label htmlFor="jobUrl" className="text-sm font-medium text-gray-700">
                  Job Description URL
                </Label>
                <Input
                  id="jobUrl"
                  type="url"
                  placeholder="https://company.com/jobs/senior-developer"
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            <Button
              onClick={analyzeResume}
              disabled={isAnalyzing}
              className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              {isAnalyzing ? (
                <>
                  <TrendingUp className="h-5 w-5 mr-2 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5 mr-2" />
                  Analyze Resume
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          <div>
            <Card className="border-0 shadow-lg min-h-[600px]">
              <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Analysis Results
                </CardTitle>
                <CardDescription className="text-gray-300">
                  AI-powered resume analysis and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {analysis ? (
                  <div className="prose prose-sm max-w-none">
                    <Textarea
                      value={analysis}
                      readOnly
                      className="min-h-[500px] w-full border-0 resize-none bg-gray-50 font-mono text-sm"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[500px] text-gray-500">
                    <Brain className="h-16 w-16 mb-4 text-gray-300" />
                    <p className="text-lg">Upload a resume and job URL to get started</p>
                    <p className="text-sm">AI analysis will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600">Advanced natural language processing to understand resumes and job requirements</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Accurate Scoring</h3>
            <p className="text-gray-600">Comprehensive scoring system that evaluates multiple dimensions of candidate fit</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Actionable Insights</h3>
            <p className="text-gray-600">Clear recommendations to improve candidate-role alignment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
