import BaseForm from '../../BaseForm/Index';
import './styles.scss';
import {makePrivateRequest, makeRequest} from 'core/utils/request';
import {Controller, useForm} from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Category } from 'core/types/Product';
import Select from 'react-select';
import PriceField from './PriceField';
import ImageUpload from '../ImageUpload';

export type FormState = {
    name: string;
    price: string;
    description: string;
    imagUrl:string;
    categories: Category[];
}

type ParamsType = {
    productId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
    const history = useHistory() 
    const { productId } = useParams<ParamsType>();
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [uploadedImgUrl, setUploadedImgUrl] = useState('');
    const [productImgUrl, setProductImgUrl] = useState('');
   
    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'Editar produto' : 'Cadastrar um Produto';

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
                .then(response => {
                    setValue('name', response.data.name);
                    setValue('price', response.data.price);
                    setValue('description', response.data.description);
                    setValue('categories', response.data.categories);
                    setProductImgUrl(response.data.imgUrl);
                })
        }
    }, [productId, isEditing, setValue]);

    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({ url: '/categories' })
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));
    }, [])
    
    const onSubmit = (data: FormState) => {
        const payload = {
            ...data, 
            imgUrl: uploadedImgUrl || productImgUrl
        }



        makePrivateRequest({
            url: isEditing ? `/products/${productId}` : '/products',
            method: isEditing ? 'PUT' : 'POST',
            data: payload
        })
        .then(() => {
            toast.info('Produto salvo com sucesso!');
            history.push('/admin/products');
        })
        .catch(() => {
            toast.error('Erro ao salvar produto');
        })
     }

     const onUploadSuccess = (imgUrl: string) => {
        setUploadedImgUrl(imgUrl);
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
                        <div className="margin-bottom-30">
                            <Controller
                                as={Select}
                                name="categories"
                                rules={{required: true}}
                                control={control}
                                isLoading={isLoadingCategories}
                                classNamePrefix="categories-select"
                                isMulti
                                getOptionLabel={(option: Category) => option.name}
                                getOptionValue={(option: Category) => String(option.id)}
                                options={categories}
                                placeholder="Categorias"
                                defaultValue=''
                            />
                            {errors.categories && (
                                <div className="invalid-feedback d-block">
                                    Campo obrigatório
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                        <PriceField control={control}/>
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                        <ImageUpload 
                            onUploadSuccess={onUploadSuccess}
                            productImgUrl={productImgUrl}
                            />
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