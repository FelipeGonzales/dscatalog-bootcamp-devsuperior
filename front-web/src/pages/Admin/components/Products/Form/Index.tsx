import BaseForm from '../../BaseForm/Index';
import './styles.scss';
import {makePrivateRequest, makeRequest} from 'core/utils/request';
import {useForm} from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

type FormState = {
    name: string;
    price: string;
    description: string;
    imagUrl:string;
}

type ParamsType = {
    productId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const history = useHistory() 
    const { productId } = useParams<ParamsType>();
    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'Editar produto' : 'Cadastrar um Produto';

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
                .then(response => {
                    setValue('name', response.data.name);
                    setValue('price', response.data.price);
                    setValue('description', response.data.description);
                    setValue('imgUrl', response.data.imgUrl);
                })
        }
    }, [productId, isEditing, setValue]);
    
    const onSubmit = (data: FormState) => {

        makePrivateRequest({
            url: isEditing ? `/products/${productId}` : '/products',
            method: isEditing ? 'PUT' : 'POST',
            data
        })
        .then(() => {
            toast.info('Produto salvo com sucesso!');
            history.push('/admin/products');
        })
        .catch(() => {
            toast.error('Erro ao salvar produto');
        })
     }

return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <BaseForm 
            title={formTitle}
        >
            <div className="row">
                <div className="col-6">
                <div className="margin-bottom-30">
                            <input
                                ref={register({
                                    required: "Campo Obrigatório",
                                    minLength: {value: 5, message: 'O campo deve ter no mínimo 5 caracteres'},
                                    maxLength: {value: 60, message: 'O campo deve ter no máximo 60 caracteres'}
                                })}
                                name="name"
                                type="text"
                                className="form-control input-base"
                                placeholder="Nome do Produto"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        {/* <select
                    value={formData.category}
                    className="form-control mb-5 input-base" 
                    onChange={handleOnChange}
                    name="category"
                    >
                        <option value="1">Livros</option>
                        <option value="3">Computadores</option>
                        <option value="2">Eletrônicos</option>
                    </select>
                    </select> */}
                        <div className="margin-bottom-30">
                            <input
                                ref={register({ required: "Campo Obrigatório" })}
                                name="price"
                                type="number"
                                className="form-control  input-base"
                                placeholder="Preço"
                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input
                                ref={register({ required: "Campo Obrigatório" })}
                                name="imagUrl"
                                type="text"
                                className="form-control input-base"
                                placeholder="Imagem do produto"
                            />
                            {errors.imagUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imagUrl.message}
                                </div>
                            )}
                        </div>
                </div>
                <div className="col-6">
                    <textarea 
                        name="description" 
                        ref={register({ required: "Campo Obrigatório" })}
                        className="form-control input-base"
                        placeholder="Descrição"
                        cols={30} 
                        rows={10}
                    />
                    {errors.description && (
                            <div className="invalid-feedback d-block">
                                {errors.description.message}
                            </div>
                        )}
                </div>
            </div>
        </BaseForm>
    </form>
)
}

export default Form;