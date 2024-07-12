const ctx = document.getElementById("sedeSingapur").getContext('2d');
const ctx1=document.getElementById("china").getContext("2d");
const ctx2=document.getElementById("arg").getContext("2d");
const ctx3=document.getElementById("cuba").getContext("2d");
fetch('/datos-json/sede.json')
    .then(response => response.json())
    .then(data => {
        const a=data['Singapur']['2010']['Oro']
        const b=data['Singapur']['2010']['Plata']
        const c=data['Singapur']['2010']['Bronce']
        const d=data['Singapur']['2014']['Oro']
        const e=data['Singapur']['2014']['Plata']
        const f=data['Singapur']['2014']['Bronce']
        const g=data['Singapur']['2018']['Oro']
        const h=data['Singapur']['2018']['Plata']
        const i=data['Singapur']['2018']['Bronce']
        const j=data['China']['2010']['Oro']
        const k=data['China']['2010']['Plata']
        const l=data['China']['2010']['Bronce']
        const m=data['China']['2014']['Oro']
        const n=data['China']['2014']['Plata']
        const o=data['China']['2014']['Bronce']
        const p=data['China']['2018']['Oro']
        const q=data['China']['2018']['Plata']
        const v=data['China']['2018']['Bronce']
        const w=data['Argentina']['2010']['Oro']
        const x=data['Argentina']['2010']['Plata']
        const y=data['Argentina']['2010']['Bronce']
        const z=data['Argentina']['2014']['Oro']
        const aa=data['Argentina']['2014']['Plata']
        const bb=data['Argentina']['2014']['Bronce']
        const cc=data['Argentina']['2018']['Oro']
        const dd=data['Argentina']['2018']['Plata']
        const ee=data['Argentina']['2018']['Bronce']
        const ff=data['Cuba']['2010']['Oro']
        const gg=data['Cuba']['2010']['Plata']
        const hh=data['Cuba']['2010']['Bronce']
        const ii=data['Cuba']['2014']['Oro']
        const jj=data['Cuba']['2014']['Plata']
        const kk=data['Cuba']['2014']['Bronce']
        const ll=data['Cuba']['2018']['Oro']
        const mm=data['Cuba']['2018']['Plata']
        const nn=data['Cuba']['2018']['Bronce']

        graficar(ctx,a,d,g,b,e,h,c,f,i);
        graficar(ctx1,j,m,p,k,n,q,l,o,v);
        graficar(ctx2,w,z,cc,x,aa,dd,y,bb,ee);
        graficar(ctx3,ff,ii,ll,gg,jj,mm,hh,kk,nn)
        function graficar(ctx, a,b,c,d,e,f,g,h,i){
            return new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['2010', '2014', '2018'],
                    datasets: [
                        {
                            label: 'Oro',
                            data: [a, b, c],
                            backgroundColor: 'rgba(255, 215, 0, 0.2)',
                            borderColor: 'rgba(255, 215, 0, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Plata',
                            data: [d, e, f],
                            backgroundColor: 'rgba(192, 192, 192, 0.2)',
                            borderColor: 'rgba(192, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Bronce',
                            data: [g, h, i],
                            backgroundColor: 'rgba(205, 127, 50, 0.2)',
                            borderColor: 'rgba(205, 127, 50, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

        }
    })



