'use client'

import SideBar from '@/src/components/SideBar';
import ModalCrearNovela from '@/src/components/ModalCrearNovela';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Novel{
  id:number;
  title:string;
  description:string;
  coverImage:string;
}

export default function Novels() {

  const [novels, setNovels] = useState<Novel[]>([]);
  

  const getNovels = async () => {
    try {
      const response = await axios.get("/api/get-novels");
      console.log(response.data);
      setNovels(response.data);
       console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        if (error.response?.status === 403) {
          try {
            const refreshResponse = await axios.post("/api/refresh-token");
            console.log("Refresh:", refreshResponse.data);
            
            const response = await axios.get("/api/get-novels");
            console.log(response.data);
            setNovels(response.data);
          } catch (refreshError) {
            console.log("Error al refrescar el token:", refreshError);
          }
        }
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getNovels();
  }, []);

 
  return (
    <SideBar>
      <div className='h-screen flex flex-col'>
        <h1 className='text-center py-4'>Tus novelas</h1>
        <div className='items-center justify-center'>
          {novels.length ? (
            novels.map((novel) => (
              <React.Fragment key={novel.id}>
                <ul  className="list bg-base-100 rounded-box shadow-md">
                  <li className="list-row">
              
                    <div><img className="size-10 rounded-box" src={`${process.env.NEXT_PUBLIC_IMG_URL}${novel.coverImage}`}/></div>
                    <div>
                      <div>{novel.title}</div>
                      <div className="text-xs font-semibold opacity-60 truncate ...">{novel.description}</div>
                    </div>
                    <button className="btn btn-primary btn-ghost">
                      Ver
                    </button>
                    <button className="btn btn-error btn-ghost">
                      Eliminar
                    </button>
                  </li>
                </ul>
                <ModalCrearNovela/>
                </React.Fragment>
            ))
          ) : (
            <ModalCrearNovela />
          )}
        </div>
      </div>
    </SideBar>
  );
}