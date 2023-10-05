
import character from './ClassTamagotchi.js';
import { useState } from 'react';
import { useEffect } from 'react';

const Characteristics = () => {

    return (
        <div>
            <ul>
                {character.characteristics.map((k, v) => (
                    <li >{k} = {v}</li>
                ))}
            </ul>
        </div>
    );
}
export default Characteristics;