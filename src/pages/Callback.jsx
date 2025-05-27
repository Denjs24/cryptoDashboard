import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigation } from "../shared/hooks/useNavigation";
import { useCrypto } from "../context/crypto-context";

const callbackSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    surname: z.string().min(2, { message: "Surname is required" }),
    phone: z.string().min(2, { message: "Phone is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    country: z.enum(["ua", "us", "de", "fr", "pl"], {
        errorMap: () => ({ message: "Country is required" })
    })
});

export function Callback() {
    const navigate = useNavigation();
    const {changeCallbackData} = useCrypto();
    const {register, handleSubmit, formState} = useForm({
        resolver: zodResolver(callbackSchema)
    });

    const onSubmit = (data) => {
        console.log(data);
        changeCallbackData(data);
        navigate.to('/success');
    }

    return (
        <div className="callback">
            <div className="callback__head">
                <h2 className="callback__title _title">Callback</h2>
                <p className="callback__text text-base text-gray-400">This is a callback page.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-3 max-w-80">
                <div className="flex flex-col flex-shrink-0 flex-grow-0 w-full gap-y-1">
                    <label htmlFor="nameField" className="text-base text-gray-400 block">Name</label>
                    <input type="text" {...register('name')} className="border border-gray-300 rounded-xl px-3 min-h-10  block text-black" placeholder="Name" id="nameField" />
                    {formState.errors?.name?.message && <span className="text-red-500 text-sm mt-2">{formState.errors.name.message}</span>}
                </div>
                <div className="flex flex-col flex-shrink-0 flex-grow-0 w-full gap-y-1">
                    <label htmlFor="surnameField" className="text-base text-gray-400 block">Surname</label>
                    <input type="text" {...register('surname')} className="border border-gray-300 rounded-xl px-3 min-h-10 block text-black" placeholder="Surname" id="surnameField" />
                    {formState.errors?.surname?.message && <span className="text-red-500 text-sm mt-2">{formState.errors.surname.message}</span>}
                </div>
                <div className="flex flex-col flex-shrink-0 flex-grow-0 w-full gap-y-1">
                    <label htmlFor="phoneField" className="text-base text-gray-400 block">Phone</label>
                    <input type="text" {...register('phone')} className="border border-gray-300 rounded-xl px-3 min-h-10 block text-black" placeholder="Phone" id="phoneField" />
                    {formState.errors?.phone?.message && <span className="text-red-500 text-sm mt-2">{formState.errors.phone.message}</span>}
                </div>
                <div className="flex flex-col flex-shrink-0 flex-grow-0 w-full gap-y-1">
                    <label htmlFor="emailField" className="text-base text-gray-400 block">Email</label>
                    <input type="text" {...register('email')} className="border border-gray-300 rounded-xl px-3 min-h-10 block text-black" placeholder="Email" id="emailField" />
                    {formState.errors?.email?.message && <span className="text-red-500 text-sm mt-2">{formState.errors.email.message}</span>}
                </div>
                <div className="flex flex-col flex-shrink-0 flex-grow-0 w-full gap-y-1">
                    <label htmlFor="countryField" className="text-base text-gray-400 block">Country</label>
                    <select {...register('country')} id="countryField" className="border border-gray-300 rounded-xl px-3 min-h-10 block text-black">
                        <option value="ua">Ukraine</option>
                        <option value="us">United States</option>
                        <option value="de">Germany</option>
                        <option value="fr">France</option>
                        <option value="pl">Poland</option>
                    </select>
                    {formState.errors?.country?.message && <span className="text-red-500 text-sm mt-2">{formState.errors.country.message}</span>}
                </div>
                <button type="submit" className="text-white py-3 px-4 rounded-xl bg-blue-500 hover:bg-blue-700 w-full transition">Надіслати</button>
            </form>
        </div>
    )
}