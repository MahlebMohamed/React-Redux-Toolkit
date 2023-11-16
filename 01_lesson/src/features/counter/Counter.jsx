import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, reste, incrementByAmount } from './counterSlice';

function Counter() {

    const dispatch = useDispatch();
    const count = useSelector(state => state.counter.count);

    const [incrementAmount, setIncrementAmount] = useState(0);

    const addValue = Number(incrementAmount) || 0;

    return (
        <section>
            <p>{count}</p>
            <div>
                <button onClick={() => { dispatch(increment()) }}>+</button>
                <button onClick={() => { dispatch(decrement()) }}>-</button>
            </div>

            <input
                type="text"
                value={incrementAmount}
                onChange={(e) => setIncrementAmount(e.target.value)}
            />

            <div>
                <button onClick={() => { dispatch(incrementByAmount(addValue)) }}>Add Amount</button>
                <button onClick={() => {
                    setIncrementAmount(0)
                    dispatch(reste());
                }}>Reset</button>
            </div>
        </section>
    )
}

export default Counter;