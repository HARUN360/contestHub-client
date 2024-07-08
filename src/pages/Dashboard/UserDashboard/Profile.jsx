import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hukse/useAuth";
import useAxiosPublic from "../../../hukse/useAxiosPublic";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Profile = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: paymentUser = [] } = useQuery({
        queryKey: ['pay'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/pay/${user.email}`);
            return res.data;
        }
    })
    // console.log(paymentUser);
    const winner = paymentUser.filter(item => item.status === 'winner');
    const notwinner = paymentUser.filter(item => item.status !== 'winner');
    const wilength = winner.length;
    const notwinlength = notwinner.length;
    const item = [wilength, notwinlength];
    const data = [
        { name: 'Winner', value: wilength },
        { name: 'Pending', value: notwinlength },

    ];
    // console.log(serviceConfirm.length);

    // chirt started
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };



    return (
        <div>
            <h1 className='text-3xl text-center font-semibold'>My Profile</h1>
            <div className='bg-gray-400 py-2 my-4 md:mx-60 rounded-xl'>
                <div className='w-[200px] mx-auto flex flex-col items-center'>
                    <div className="w-32 rounded-full">
                        <img src={user?.photoURL} className='rounded-full' />
                    </div>
                    <h2 className='text-red-600 text-xl font-bold'>{user?.displayName}</h2>
                    <h2 className='text-red-600 text-xl font-bold'>{user?.email}</h2>
                </div>
            </div>


            <div className=''>
                <h1 className='text-xl text-black font-bold text-center'>Winning Percentage</h1>
                <PieChart width={600} height={200}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend></Legend>
                </PieChart>
            </div>
        </div>
    );
};

export default Profile;