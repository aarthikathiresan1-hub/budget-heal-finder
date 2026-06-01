import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Hospital, MapPin, Phone, Star, Stethoscope, Wallet, Search, Building2, BadgeDollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Budget-Friendly Nearby Hospital Finder" },
      { name: "description", content: "Find affordable hospitals near you based on your budget and medical needs." },
      { property: "og:title", content: "Budget-Friendly Nearby Hospital Finder" },
      { property: "og:description", content: "Find affordable hospitals near you based on your budget and medical needs." },
    ],
  }),
  component: Index,
});

type HospitalItem = {
  id: number;
  name: string;
  city: string;
  distanceKm: number;
  fee: number;
  rating: number;
  facilities: string[];
  specialties: string[];
  phone: string;
};

const HOSPITALS: HospitalItem[] = [
  { id: 1, name: "City Care General Hospital", city: "downtown", distanceKm: 2.3, fee: 300, rating: 4.5, facilities: ["ICU", "Pharmacy", "Ambulance", "Lab"], specialties: ["general", "cardiology", "orthopedics"], phone: "+1 555-0101" },
  { id: 2, name: "Sunrise Multispecialty", city: "downtown", distanceKm: 4.1, fee: 600, rating: 4.7, facilities: ["ICU", "MRI", "Pharmacy", "24/7 ER"], specialties: ["cardiology", "neurology", "oncology"], phone: "+1 555-0102" },
  { id: 3, name: "GreenLeaf Community Clinic", city: "westside", distanceKm: 1.2, fee: 150, rating: 4.2, facilities: ["Pharmacy", "Lab"], specialties: ["general", "pediatrics"], phone: "+1 555-0103" },
  { id: 4, name: "Hopewell Children's Hospital", city: "northside", distanceKm: 5.8, fee: 450, rating: 4.8, facilities: ["NICU", "Pharmacy", "Ambulance"], specialties: ["pediatrics", "general"], phone: "+1 555-0104" },
  { id: 5, name: "Metro Heart Institute", city: "downtown", distanceKm: 6.5, fee: 800, rating: 4.9, facilities: ["Cath Lab", "ICU", "24/7 ER"], specialties: ["cardiology"], phone: "+1 555-0105" },
  { id: 6, name: "Bluebell Women's Care", city: "eastside", distanceKm: 3.4, fee: 350, rating: 4.4, facilities: ["Maternity", "Pharmacy", "Lab"], specialties: ["gynecology", "general"], phone: "+1 555-0106" },
  { id: 7, name: "NeuroPlus Hospital", city: "northside", distanceKm: 7.2, fee: 700, rating: 4.6, facilities: ["MRI", "ICU", "Pharmacy"], specialties: ["neurology"], phone: "+1 555-0107" },
  { id: 8, name: "OrthoLife Center", city: "westside", distanceKm: 2.9, fee: 400, rating: 4.3, facilities: ["Physiotherapy", "X-Ray", "Pharmacy"], specialties: ["orthopedics"], phone: "+1 555-0108" },
  { id: 9, name: "Riverside Cancer Center", city: "eastside", distanceKm: 8.0, fee: 900, rating: 4.7, facilities: ["Chemo Unit", "ICU", "Pharmacy"], specialties: ["oncology"], phone: "+1 555-0109" },
  { id: 10, name: "Hometown Family Clinic", city: "westside", distanceKm: 0.9, fee: 100, rating: 4.0, facilities: ["Pharmacy"], specialties: ["general", "pediatrics"], phone: "+1 555-0110" },
  { id: 11, name: "Apex Multispecialty", city: "northside", distanceKm: 4.6, fee: 550, rating: 4.5, facilities: ["ICU", "MRI", "Pharmacy", "Lab"], specialties: ["general", "orthopedics", "gynecology"], phone: "+1 555-0111" },
  { id: 12, name: "CarePoint Urgent Clinic", city: "eastside", distanceKm: 1.8, fee: 200, rating: 4.1, facilities: ["24/7 ER", "Pharmacy"], specialties: ["general"], phone: "+1 555-0112" },
];

const CONDITIONS = [
  { value: "general", label: "General Checkup" },
  { value: "cardiology", label: "Cardiology (Heart)" },
  { value: "neurology", label: "Neurology (Brain)" },
  { value: "orthopedics", label: "Orthopedics (Bones)" },
  { value: "pediatrics", label: "Pediatrics (Children)" },
  { value: "gynecology", label: "Gynecology" },
  { value: "oncology", label: "Oncology (Cancer)" },
];

const LOCATIONS = [
  { value: "downtown", label: "Downtown" },
  { value: "westside", label: "Westside" },
  { value: "eastside", label: "Eastside" },
  { value: "northside", label: "Northside" },
];

function Index() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("");
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const results = useMemo(() => {
    if (!submitted) return [];
    const b = Number(budget) || 0;
    return HOSPITALS
      .filter((h) => h.specialties.includes(condition))
      .filter((h) => h.fee <= b)
      .map((h) => ({
        ...h,
        distanceKm: location && h.city === location ? h.distanceKm : h.distanceKm + 5,
      }))
      .sort((a, b) => a.fee - b.fee || a.distanceKm - b.distanceKm);
  }, [submitted, budget, condition, location]);

  const cheapest = results[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary-foreground/15 p-3">
              <Hospital className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Budget-Friendly Hospital Finder</h1>
              <p className="text-sm text-primary-foreground/80 sm:text-base">
                Find nearby care that fits your budget and medical needs.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Tell us about you
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={location} onValueChange={setLocation} required>
                  <SelectTrigger id="location"><SelectValue placeholder="Select area" /></SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map((l) => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">Medical Condition</Label>
                <Select value={condition} onValueChange={setCondition} required>
                  <SelectTrigger id="condition"><SelectValue placeholder="Select condition" /></SelectTrigger>
                  <SelectContent>
                    {CONDITIONS.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (consultation fee, $)</Label>
                <Input id="budget" type="number" min={0} value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="500" required />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full sm:w-auto" disabled={!name || !location || !condition || !budget}>
                  Find Hospitals
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {submitted && (
          <section className="space-y-6">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="grid gap-4 py-6 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <Building2 className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Hospitals found</p>
                    <p className="text-2xl font-bold">{results.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BadgeDollarSign className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cheapest option</p>
                    <p className="text-lg font-semibold">
                      {cheapest ? `${cheapest.name} • $${cheapest.fee}` : "—"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">For</p>
                    <p className="text-lg font-semibold capitalize">
                      {name} • {CONDITIONS.find((c) => c.value === condition)?.label}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {results.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center text-muted-foreground">
                  No hospitals match your budget for this condition. Try increasing your budget.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((h, idx) => (
                  <Card key={h.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg">{h.name}</CardTitle>
                        {idx === 0 && <Badge>Best Value</Badge>}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        {h.rating.toFixed(1)}
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col gap-3 text-sm">
                      <div className="flex items-center gap-2 text-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        {h.distanceKm.toFixed(1)} km away
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Wallet className="h-4 w-4 text-primary" />
                        Consultation: <span className="font-semibold">${h.fee}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Phone className="h-4 w-4 text-primary" />
                        <a href={`tel:${h.phone}`} className="hover:underline">{h.phone}</a>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-2">
                        {h.facilities.map((f) => (
                          <Badge key={f} variant="secondary">{f}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        Sample data for demo purposes only. Always consult a qualified medical professional.
      </footer>
    </div>
  );
}
