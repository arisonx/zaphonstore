import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import { CgNotes } from "react-icons/cg";
export function LogsViewDialog() {
 return (
  <Dialog>
   <DialogTrigger className='w-[20rem] rounded-lg bg-slate-900 py-6 text-white'>
    <span className='flex w-full items-center justify-between px-16'>
     <p className='text-base'>Visualizar Logs</p>
     <CgNotes size={18} className='text-color' />
    </span>
   </DialogTrigger>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Are you absolutely sure?</DialogTitle>
     <DialogDescription>
      This action cannot be undone. This will permanently delete your account and remove your data
      from our servers.
     </DialogDescription>
    </DialogHeader>
   </DialogContent>
  </Dialog>
 );
}
