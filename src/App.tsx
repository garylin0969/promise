import { useForm } from 'react-hook-form';

const createPromise = <DataType extends {}>(data: DataType): Promise<DataType> => {
    return new Promise((resolve, reject) => {
        resolve(data);
    });
};

function App() {
    const time1 = () => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                console.log('1000');
                resolve();
            }, 1000);
        });
    };
    const time2 = () => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                console.log('2000');
                resolve();
            }, 2000);
        });
    };
    const time3 = () => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                console.log('3000');
                resolve();
            }, 3000);
        });
    };

    const tryAsyncAwait = async () => {
        await time2();
        await time3();
        await time1();
    };

    const { register, handleSubmit } = useForm();
    const { register: otherRegister, handleSubmit: otherHandleSubmit } = useForm();

    const oneSubmit = (data: any) => {
        return data;
    };

    const twoSubmit = (data: any) => {
        return data;
    };

    const submit = async () => {
        let oneData: any;
        let twoData: any;
        const [one, two] = await Promise.all([
            handleSubmit((data) => (oneData = data))(),
            otherHandleSubmit((data) => (twoData = data))(),
        ]);
        console.log(oneData);
        console.log(twoData);
    };

    return (
        <>
            <button onClick={tryAsyncAwait}>123</button>
            <input type="text" {...register('oneName')} />
            <input type="text" {...register('oneAge')} />
            <input type="text" {...otherRegister('twoName')} />
            <input type="text" {...otherRegister('twoAge')} />
            <button type="button" onClick={submit}>
                submit
            </button>
        </>
    );
}

export default App;
