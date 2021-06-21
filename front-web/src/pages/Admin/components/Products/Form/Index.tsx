import BaseForm from '../../BaseForm/Index';
import './styles.scss';
import {makePrivateRequest} from 'core/utils/request';
import {useForm} from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

type FormState = {
    name: string;
    price: string;
    description: string;
    imageUrl:string;
}

const Form = () => {
    const { register, handleSubmit, errors } = useForm<FormState>();
    const history = useHistory() 
    
    const onSubmit = (data: FormState) => {

    makePrivateRequest({ url: '/products', method: 'POST', data })
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
        <BaseForm title="cadastrar um produto">
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
                                name="imageUrl"
                                type="text"
                                className="form-control input-base"
                                placeholder="Imagem do produto"
                            />
                            {errors.imageUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imageUrl.message}
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