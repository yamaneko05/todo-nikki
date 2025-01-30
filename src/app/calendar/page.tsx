import Calendar from "@/components/Calendar";
import CalendarHeader from "@/components/headers/CalendarHeader";

export default async function CalendarPage() {
  return (
    <>
      <CalendarHeader />
      <div className="pt-4">
        <Calendar />
      </div>
    </>
  );
}
