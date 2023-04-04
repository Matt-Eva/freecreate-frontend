
export default function formatContent(content){
    const formattedContent = content.map(el =>{
        if (el.type === "p"){
           const contentArray = formatNonList(el.content)    
           const pTag = <p>{contentArray}</p>
           return pTag
       } else if (el.type === "h1"){
           const contentArray = formatNonList(el.content)
           const hTag = <h1>{contentArray}</h1>
           return hTag
       } else if (el.type === "h2"){
           const contentArray = formatNonList(el.content)
           const hTag = <h2>{contentArray}</h2>
           return hTag
       } else if (el.type === "blockquote"){
           const contentArray = formatNonList(el.content)
           const blockTag = <blockquote>{contentArray}</blockquote>
           return blockTag
       } else if (el.type === "ol"){
           const contentArray = formatList(el.content)
           const olist = <ol>{contentArray}</ol>
           return olist
       } else if (el.type === "ul"){
           const contentArray = formatList(el.content)
           const uList = <ul>{contentArray}</ul>
           return uList
       }
     })
    return formattedContent
}

//=========================================
//=========================================
//=========================================
//=========================================


 function formatNonList(content){
    let contentArray = []
    let i = 0
    while (i < content.length){
        
        if (content[i] === "<br>"){
            contentArray.push(<br/>)
        }
        else if (content[i] === "<strong>"){
            let d = i
            let strongArray = []
            while (content[d + 1] !== "</strong>"){
                d++
                if (content[d] === "<em>"){
                    let q = d
                    let emArray = []
                    while(content[q + 1] !== "</em>"){
                        q++
                        if (content[q] === "<s>"){
                            let z = q
                            let sArray = []
                            while (content[z + 1] !== "</s>"){
                                z++
                                if (content[z] === "<u>"){
                                    let w = z
                                    let uArray = []
                                    while(content[w + 1] !=="</u>"){
                                        w++
                                        uArray.push(content[w])
                                    }
                                    const uString = <u>{uArray}</u>
                                    sArray.push(uString)
                                    z = w + 1
                                } else{
                                    sArray.push(content[z])
                                }
                            }
                            const sString = <s>{sArray}</s>
                            emArray.push(sString)
                            q = z + 1
                        } else if (content[q] === "<u>"){
                            let s = q
                            let uArray = []
                            while(content[s+1] !=="</u>"){
                                s++
                                uArray.push(content[s])
                            }
                            const uString = <u>{uArray}</u>
                            emArray.push(uString)
                            q = s + 1
                        } else {
                            emArray.push(content[q])
                        }
                    }
                    d = q + 1
                    const emString = <em>{emArray}</em>
                    strongArray.push(emString)
                } else if (content[d] === "<s>"){
                    let s = d
                    let sArray = []
                    while (content[s + 1] !== "</s>"){
                        s++
                        if (content[s] === "<u>"){
                            let w = s
                            let uArray = []
                            while(content[w + 1] !=="</u>"){
                                w++
                                uArray.push(content[w])
                            }
                            const uString = <s>{uArray}</s>
                            sArray.push(uString)
                            s = w + 1
                        } else{
                            sArray.push(content[s])
                        }
                    }
                    const sString = <u>{sArray}</u>
                    strongArray.push(sString)
                    d = s + 1
                } else if (content[d] === "<u>"){
                    let w = d
                    let uArray = []
                    while(content[w + 1] !=="</u>"){
                        w++
                        uArray.push(content[w])
                    }
                    const uString = <s>{uArray}</s>
                    strongArray.push(uString)
                    d = w + 1
                } else {
                    strongArray.push(content[d])
                }
            }
            i = d + 1
            const strongEl = <strong>{strongArray}</strong>
            contentArray.push(strongEl)
        } else if (content[i] === "<em>"){
            let q = i
            let emArray = []
            while(content[q + 1] !== "</em>"){
                q++
                if (content[q] === "<s>"){
                    let z = q
                    let sArray = []
                    while (content[z + 1] !== "</s>"){
                        z++
                        if (content[z] === "<u>"){
                            let w = z
                            let uArray = []
                            while(content[w + 1] !=="</u>"){
                                w++
                                uArray.push(content[w])
                            }
                            const uString = <u>{uArray}</u>
                            sArray.push(uString)
                            z = w + 1
                        } else{
                            sArray.push(content[z])
                        }
                    }
                    const sString = <s>{sArray}</s>
                    emArray.push(sString)
                    q = z + 1
                } else if (content[q] === "<u>"){
                    let s = q
                    let uArray = []
                    while(content[s+1] !=="</u>"){
                        s++
                        uArray.push(content[s])
                    }
                    const uString = <u>{uArray}</u>
                    emArray.push(uString)
                    q = s + 1
                } else {
                    emArray.push(content[q])
                }
            }
            i = q + 1
            const emString = <em>{emArray}</em>
            contentArray.push(emString)
        } else if (content[i] === "<s>"){
            let s = i
            const sArray = []
            while (content[s + 1] !== "</s>"){
                s++
                if (content[s] === "<u>"){
                    let w = s
                    let uArray = []
                    while(content[w + 1] !=="</u>"){
                        w++
                        uArray.push(content[w])
                    }
                    const uString = <u>{uArray}</u>
                    sArray.push(uString)
                    s = w + 1
                } else{
                    sArray.push(content[s])
                }
            }
            const sString = <s>{sArray}</s>
            contentArray.push(sString)
            i = s + 1
        } else if (content[i] === "<u>"){
            let w = i
            let uArray = []
            while(content[w + 1] !=="</u>"){
                w++
                uArray.push(content[w])
            }
            const uString = <u>{uArray}</u>
            contentArray.push(uString)
            i = w + 1
        } else{
            contentArray.push(content[i])
        }
        i++
    }
    console.log(contentArray)
    return contentArray
  }

//=========================================
//=========================================
//=========================================
//=========================================

 function formatList(content){
    let contentArray = []
    let n = 0
    while (n < content.length){
        
        if (content[n] === "<li>"){
            let i = n
            const liArray = []
            while(content[i + 1] !== "</li>"){
                i++
                if (content[i] === "<strong>"){
                    let d = i
                    let strongArray = []
                    while (content[d + 1] !== "</strong>"){
                        d++
                        if (content[d] === "<em>"){
                            let q = d
                            let emArray = []
                            while(content[q + 1] !== "</em>"){
                                q++
                                if (content[q] === "<s>"){
                                    let z = q
                                    let sArray = []
                                    while (content[z + 1] !== "</s>"){
                                        z++
                                        if (content[z] === "<u>"){
                                            let w = z
                                            let uArray = []
                                            while(content[w + 1] !=="</u>"){
                                                w++
                                                uArray.push(content[w])
                                            }
                                            const uString = <u>{uArray}</u>
                                            sArray.push(uString)
                                            z = w + 1
                                        } else{
                                            sArray.push(content[z])
                                        }
                                    }
                                    const sString = <s>{sArray}</s>
                                    emArray.push(sString)
                                    q = z + 1
                                } else if (content[q] === "<u>"){
                                    let s = q
                                    let uArray = []
                                    while(content[s+1] !=="</u>"){
                                        s++
                                        uArray.push(content[s])
                                    }
                                    const uString = <u>{uArray}</u>
                                    emArray.push(uString)
                                    q = s + 1
                                } else {
                                    emArray.push(content[q])
                                }
                            }
                            d = q + 1
                            const emString = <em>{emArray}</em>
                            strongArray.push(emString)
                        } else if (content[d] === "<s>"){
                            let s = d
                            let sArray = []
                            while (content[s + 1] !== "</s>"){
                                s++
                                if (content[s] === "<u>"){
                                    let w = s
                                    let uArray = []
                                    while(content[w + 1] !=="</u>"){
                                        w++
                                        uArray.push(content[w])
                                    }
                                    const uString = <s>{uArray}</s>
                                    sArray.push(uString)
                                    s = w + 1
                                } else{
                                    sArray.push(content[s])
                                }
                            }
                            const sString = <u>{sArray}</u>
                            strongArray.push(sString)
                            d = s + 1
                        } else if (content[d] === "<u>"){
                            let w = d
                            let uArray = []
                            while(content[w + 1] !=="</u>"){
                                w++
                                uArray.push(content[w])
                            }
                            const uString = <s>{uArray}</s>
                            strongArray.push(uString)
                            d = w + 1
                        } else {
                            strongArray.push(content[d])
                        }
                    }
                    i = d + 1
                    const strongEl = <strong>{strongArray}</strong>
                    liArray.push(strongEl)
                } else if (content[i] === "<em>"){
                    let q = i
                    let emArray = []
                    while(content[q + 1] !== "</em>"){
                        q++
                        if (content[q] === "<s>"){
                            let z = q
                            let sArray = []
                            while (content[z + 1] !== "</s>"){
                                z++
                                if (content[z] === "<u>"){
                                    let w = z
                                    let uArray = []
                                    while(content[w + 1] !=="</u>"){
                                        w++
                                        uArray.push(content[w])
                                    }
                                    const uString = <u>{uArray}</u>
                                    sArray.push(uString)
                                    z = w + 1
                                } else{
                                    sArray.push(content[z])
                                }
                            }
                            const sString = <s>{sArray}</s>
                            emArray.push(sString)
                            q = z + 1
                        } else if (content[q] === "<u>"){
                            let s = q
                            let uArray = []
                            while(content[s+1] !=="</u>"){
                                s++
                                uArray.push(content[s])
                            }
                            const uString = <u>{uArray}</u>
                            emArray.push(uString)
                            q = s + 1
                        } else {
                            emArray.push(content[q])
                        }
                    }
                    i = q + 1
                    const emString = <em>{emArray}</em>
                    liArray.push(emString)
                } else if (content[i] === "<s>"){
                    let s = i
                    const sArray = []
                    while (content[s + 1] !== "</s>"){
                        s++
                        if (content[s] === "<u>"){
                            let w = s
                            let uArray = []
                            while(content[w + 1] !=="</u>"){
                                w++
                                uArray.push(content[w])
                            }
                            const uString = <u>{uArray}</u>
                            sArray.push(uString)
                            s = w + 1
                        } else{
                            sArray.push(content[s])
                        }
                    }
                    const sString = <s>{sArray}</s>
                    liArray.push(sString)
                    i = s + 1
                } else if (content[i] === "<u>"){
                    let w = i
                    let uArray = []
                    while(content[w + 1] !=="</u>"){
                        w++
                        uArray.push(content[w])
                    }
                    const uString = <u>{uArray}</u>
                    liArray.push(uString)
                    i = w + 1
                } else {
                    liArray.push(content[i])
                }
            }
            n = i+1
            const liString = <li>{liArray}</li>
            contentArray.push(liString)
        }
        n++
    }
    console.log(contentArray)
    return contentArray
  }